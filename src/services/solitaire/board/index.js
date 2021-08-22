import { initCards } from '../cards';
import { checkInitialBoardMoves } from '../moves';

export const initBoard = () => {
  const cards = initCards();
  const hasBoardMoves = checkInitialBoardMoves(cards);

  if (!hasBoardMoves) {
    return initBoard();
  }

  return cards;
};

export const updateBoard = ({ cards }, { cardsFrom, cardsTo }) =>
  cards.map((columnCards, index) => {
    if (index === cardsFrom.columnNo) {
      return cardsFrom.columnCards;
    }

    if (index === cardsTo?.columnNo) {
      return cardsTo.columnCards;
    }

    return columnCards;
  });

export const isBoardEmpty = ({ cards }) => !cards.flat().length;
