const showHideCards = (cards, offset = 0) =>
  cards.map((card, index) => {
    if ((index + offset) % 2 === 0) {
      return {
        ...card,
        visible: true,
      };
    }

    return card;
  });

const getBoard = (rules, deck) => {
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

const initBoard = ({ rules }, deck) => getBoard(rules, deck);

export default initBoard;
