// eslint-disable-next-line import/prefer-default-export
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
