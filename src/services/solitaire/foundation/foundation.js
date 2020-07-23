export const initFoundations = ({ rules }) => rules.foundationColumns.map(() => []);

export const checkEmptyFoundationColumn = (foundationColumn) => !foundationColumn.length;

export const checkFoundationColumnSuit = (foundationColumn, selectedCard) =>
  foundationColumn.filter((card) => card.suit === selectedCard.suit).length > 0;

export const getFoundationColumn = (foundationColumnNo) =>
  foundationColumnNo >= 0 ? foundationColumnNo : 0;
