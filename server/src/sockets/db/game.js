import { nanoid } from 'nanoid';
import {
  initCards,
  checkGameState,
  checkGameTime,
  checkGameMoves,
} from '@/services/solitaire';
import { createISODate } from '@/helpers/dates';
import 'dotenv/config';

const getMockedCards = async (db, uid) => {
  const { value } = await db
    .collection('decks')
    .findOneAndUpdate({ isMocked: true }, { $set: { uid } }, { upsert: true });

  return value.cards;
};

export const newDeck = async (db, uid, isMocked) => {
  const hash = nanoid();
  const date = createISODate();
  const cards = !isMocked ? initCards() : await getMockedCards(db, uid);

  console.log({ isMocked });

  db.collection('decks').findOneAndUpdate(
    { uid },
    { $set: { uid, cards, date, hash, hasPlayed: false } },
    { upsert: true }
  );

  return { cards, hash };
};

export const saveGame = async (db, uid, game) => {
  const { moves, times } = game;
  const date = createISODate();

  // Find users deck.
  const { value } = await db
    .collection('decks')
    .findOneAndUpdate(
      { uid, hasPlayed: false },
      { $set: { hasPlayed: true } },
      { projection: { cards: 1, hash: 1 } }
    );

  // If existing user has no deck then don't save game.
  // For users on app version < v3.0.0
  if (!value) {
    return;
  }

  const { cards, hash } = value;
  const { isGameFinished, hasMoves } = checkGameState(moves, cards);
  const isValidTime = checkGameTime(times, hash);
  const isValidMoves = checkGameMoves(moves, times);

  db.collection('games').insertOne({
    date,
    uid,
    moves: moves.length,
    time: times.length,
    won: isGameFinished && !hasMoves && isValidTime && isValidMoves,
    lost: (!isGameFinished && !hasMoves) || !isValidTime || !isValidMoves,
    completed: true,
    deck: cards,
    solution: {
      times,
      moves,
    },
  });
};
