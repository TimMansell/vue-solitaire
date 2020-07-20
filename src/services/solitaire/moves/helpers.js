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
  const hasFoundationMoves = topFoundationCards.filter((topFoundationCard) =>
    validateCardMove(topFoundationCard, bottomCard)
  );
  return hasFoundationMoves.length > 0;
};
