// eslint-disable-next-line import/prefer-default-export
export const getBoardState = (newGame) => {
  const gameState = JSON.parse(localStorage.getItem('vuex'));
  const boardToUse = newGame ? '' : gameState.solitaire.board;

  return boardToUse;
};
