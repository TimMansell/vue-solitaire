import { columns } from '@/config/settings.json';
import { setBoard, getColumnIndexes, getColumnCards } from './board';

export const initBoard = (deck) => {
  const columnCardsIndexes = getColumnIndexes(columns);
  const columnCards = getColumnCards(deck, columnCardsIndexes);
  const cards = setBoard(columnCards);

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
