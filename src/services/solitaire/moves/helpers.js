import { validateCardMove } from '../validation';

export const displayMoves = (moves) => {
  if (moves.length) {
    console.log('---------------');
    moves.forEach(({ value, suit }) => {
      console.log('hasMove', `${value}${suit}`);
    });
  }
};

export const checkFoundationMove = (topFoundationCards, bottomCard) => {
  const hasMoves = topFoundationCards.filter((topFoundationCard) =>
    validateCardMove(topFoundationCard, bottomCard)
  );
  return hasMoves.length > 0;
};
