import { setVisibleCards, getColumnIndexes, getColumnCards } from './board';

import { columns } from '../settings.json';

export const initBoard = (deck) => {
  const columnCardsIndexes = getColumnIndexes(columns);
  const columnCards = getColumnCards(deck, columnCardsIndexes);
  const dealtCards = setVisibleCards(columnCards);

  return dealtCards;
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
