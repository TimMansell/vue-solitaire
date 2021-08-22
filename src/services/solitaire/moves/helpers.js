// eslint-disable-next-line import/prefer-default-export
export const displayMoves = (moves) => {
  if (process.env.NODE_ENV === 'development') {
    if (moves.length) {
      console.log('---------------');
      moves.forEach(({ value, suit }) => {
        console.log('hasMove', `${value}${suit}`);
      });
    } else {
      console.log('---------------');
      console.log('No Moves');
    }
  }
};
