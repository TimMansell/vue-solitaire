import { getBoardCards, initBoardCards } from './board';
import settings from '../settings.json';

export const initBoard = () => {
  const cards = getBoardCards(settings);
  const boardCards = initBoardCards(settings, cards);

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
