export const setVisibleCards = (columnCards) =>
  columnCards.map((cards) =>
    cards
      .reverse()
      .map((card, index) => ({
        ...card,
        visible: index % 2 === 0,
      }))
      .reverse()
  );

export const getColumnCards = (deck, columnCardsIndexes) =>
  columnCardsIndexes.map(({ startIndex, endIndex }) =>
    deck.slice(startIndex, endIndex)
  );

export const getColumnIndexes = (columns) =>
  columns.map((column, columnIndex, array) => {
    const startArray = array.slice(0, columnIndex);
    const endArray = array.slice(0, columnIndex + 1);

    const calcOffset = (accumulator, currentValue) =>
      accumulator + currentValue;
    const startIndex = startArray.reduce(calcOffset, 0);
    const endIndex = endArray.reduce(calcOffset, 0);

    return {
      startIndex,
      endIndex,
    };
  });
