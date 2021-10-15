import { initCards, checkGameState } from '@/services/solitaire';
import { createISODate } from '@/helpers/dates';
import 'dotenv/config';

const getMockedCards = async (db, uid) => {
  const { value } = await db
    .collection('decks')
    .findOneAndUpdate({ isMocked: true }, { $set: { uid } }, { upsert: true });

  return value.cards;
};

export const newDeck = async (db, uid, isMocked) => {
  const date = createISODate();
  const cards = !isMocked ? initCards() : await getMockedCards(db, uid);

  db.collection('decks').findOneAndUpdate(
    { uid },
    { $set: { uid, cards, date, hasPlayed: false } },
    { upsert: true }
  );

  return cards;
};

export const saveGame = async (db, uid, game, gameOutcome) => {
  const { moves, time } = game;
  const date = createISODate();

  // Find users deck.
  const { value } = await db
    .collection('decks')
    .findOneAndUpdate(
      { uid, hasPlayed: false },
      { $set: { hasPlayed: true } },
      { projection: { cards: 1 } }
    );

  // If existing user has no deck then save game using old format.
  // For users on app version < v3.0.0
  if (!value) {
    const user = await db
      .collection('users')
      .findOne({ uid }, { projection: { name: 1 } });

    if (!user) return;

    db.collection('games').insertOne({
      date,
      uid,
      moves: moves.length,
      time,
      won: gameOutcome.hasGameWon,
      lost: gameOutcome.hasGameLost,
      completed: true,
    });

    return;
  }

  const { cards } = value;
  const { isGameFinished, hasMoves } = checkGameState(moves, cards);

  db.collection('games').insertOne({
    date,
    uid,
    moves: moves.length,
    time,
    won: isGameFinished && !hasMoves,
    lost: !isGameFinished && !hasMoves,
    completed: true,
  });
};
