import settings from '../settings.json';

export const displayMoves = (moves) => {
  if (moves.length) {
    console.log('---------------');
    moves.forEach(({ value, suit }) => {
      console.log('hasMove', `${value}${suit}`);
    });
  } else {
    console.log('---------------');
    console.log('No Moves');
  }
};

export const getColumnCards = ({
  toCards,
  fromCards,
  selectedColumn,
  columnNo,
  cardPosition,
}) => {
  const columnCards = toCards[selectedColumn];
  const moveCards = fromCards[columnNo].slice(cardPosition);

  return [...columnCards, ...moveCards];
};

export const checkEmptyColumns = (cards) =>
  cards.length < settings.rules.columns.length;
