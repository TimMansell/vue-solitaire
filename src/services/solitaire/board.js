import { showHideCards } from './cards';

const initBoard = ({ rules }, deck) => {
  const { columns } = rules;

  const dealtCards = columns.map((column, columnIndex, array) => {
    const startArray = array.slice(0, columnIndex);
    const endArray = array.slice(0, columnIndex + 1);

    const calcOffset = (accumulator, currentValue) => accumulator + currentValue;

    const startIndex = startArray.reduce(calcOffset, 0);
    const endIndex = endArray.reduce(calcOffset, 0);

    const cards = deck.slice(startIndex, endIndex);

    // Offset by one.
    if (columnIndex > 3) {
      return showHideCards(cards, 1);
    }

    return showHideCards(cards);
  });

  return dealtCards;
};

const updateBoard = ({ boardCards }, cardsFrom, cardsTo = {}) => {
  return boardCards.map((cards, index) => {
    if (index === cardsFrom.column) {
      return cardsFrom.cards;
    }

    if (index === cardsTo.column) {
      return cardsTo.cards;
    }

    return cards;
  });
};

const checkEmptyColumns = (cards) => cards.length < 8;

export { initBoard, updateBoard, checkEmptyColumns };
