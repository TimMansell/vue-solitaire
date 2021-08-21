import { getBoardCards, dealBoardCards } from './board';
import settings from '../settings.json';

export const initBoard = () => {
  const cards = getBoardCards(settings);
  const boardCards = dealBoardCards(settings, cards);

  return boardCards;
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
