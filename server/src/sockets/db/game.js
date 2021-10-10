import { initCards, checkGameState } from '@/services/solitaire';
import { createISODate } from '@/helpers/dates';
import 'dotenv/config';

export const newDeck = async (db, uid) => {
  const { NODE_ENV } = process.env;
  const isMocked = NODE_ENV === 'test';

  if (isMocked) {
    const { value } = await db
      .collection('decks')
      .findOneAndUpdate({ isMocked }, { $set: { uid } }, { upsert: true });

    return value.cards;
  }

  const date = createISODate();
  const cards = initCards();

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
