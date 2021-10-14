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
    { $set: { uid, cards, date } },
    { upsert: true }
  );

  return cards;
};

export const saveGame = async (db, uid, game) => {
  const { moves, time } = game;
  const date = createISODate();

  const { cards } = await db
    .collection('decks')
    .findOne({ uid }, { projection: { cards: 1 } });

  const { isGameFinished, hasMoves } = checkGameState(moves, cards);

  const document = {
    date,
    uid,
    moves: moves.length,
    time,
    won: isGameFinished && !hasMoves,
    lost: !isGameFinished && !hasMoves,
    completed: true,
  };

  db.collection('games').insertOne({ ...document });
};
