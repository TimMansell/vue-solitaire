// eslint-disable-next-line import/prefer-default-export
export const getBoardState = (isNewGame) => {
  const gameState = JSON.parse(localStorage.getItem('vuex'));
  const boardToUse = isNewGame ? '' : gameState.solitaire.board;

  return boardToUse;
};
