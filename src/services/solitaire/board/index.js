import { initCards } from '../cards';
import settings from '../settings.json';

export const initBoard = () => initCards(settings);

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

export const checkEmptyColumns = (cards) => cards.length < settings.rules.columns.length;
