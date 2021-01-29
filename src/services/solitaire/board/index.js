import { getBoardCards, initBoardCards } from './board';
import settings from '../settings.json';

export const initBoard = () => {
  const cards = getBoardCards(settings);
  const boardCards = initBoardCards(settings, cards);

  return boardCards;
};

export const loadBoard = ({ cards }) => cards;

export const updateBoard = ({ boardCards }, { cardsFrom, cardsTo }) =>
  boardCards.map((columnCards, index) => {
    if (index === cardsFrom.columnNo) {
      return cardsFrom.cards;
    }

    if (index === cardsTo?.columnNo) {
      return cardsTo.cards;
    }

    return columnCards;
  });
