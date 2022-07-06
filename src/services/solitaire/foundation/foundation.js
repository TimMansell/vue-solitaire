export const checkEmptyFoundationColumn = (foundationColumn) =>
  !foundationColumn.length;

export const checkFoundationColumnSuit = (foundationColumn, selectedCard) =>
  foundationColumn.some((card) => card.suit === selectedCard.suit);

export const getFoundationColumn = (foundationColumnNo) =>
  foundationColumnNo >= 0 ? foundationColumnNo : 0;
