import { initCards, checkGameState } from '@/services/solitaire/index';
import { createISODate } from '@/helpers/dates';

export const newGame = async (db, uid, isMocked) => {
  if (isMocked) {
    const { cards } = await db
      .collection('decks')
      .findOne({ uid, isMocked }, { projection: { cards: 1 } });

    return cards;
  }

  const date = createISODate();
  const cards = initCards();

  await db.collection('decks').findOneAndDelete({ uid });
  db.collection('decks').insertOne({ uid, cards, date });

  return cards;
};

export const saveGame = async (db, { uid, moves }) => {
  const date = createISODate();

  const { cards } = await db
    .collection('decks')
    .findOne({ uid }, { projection: { cards: 1 } });

  const { isGameFinished, hasMoves } = checkGameState(moves, cards);

  const game = {
    date,
    uid,
    moves: moves.length,
    won: isGameFinished && !hasMoves,
    lost: !isGameFinished && !hasMoves,
    completed: true,
  };

  db.collection('games').insertOne({ ...game });
};
