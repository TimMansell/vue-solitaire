import { findAllItems, findItemInDb } from './db';
import { validateGame } from '../../../../services/solitaire';

// eslint-disable-next-line import/prefer-default-export
export const validateMoves = async (client, uid) => {
  const findGame = findItemInDb(client, 'decks', {
    findFields: { uid },
    returnFields: {
      projection: { cards: 1 },
    },
  });

  const findMoves = findAllItems(client, 'moves', {
    findFields: { uid },
    returnFields: {
      projection: {
        date: 1,
        selectedCardId: 1,
        selectedColumn: 1,
        type: 1,
        value: 1,
        suit: 1,
      },
    },
  });

  const [deck, moves] = await Promise.all([findGame, findMoves]);

  const cardMoves = moves.filter(
    ({ type }) => type === 'board' || type === 'foundation'
  );

  const isValidGame = validateGame(deck.cards, cardMoves);

  console.log({ isValidGame });
};
