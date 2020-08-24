const getters = {
  columnCards: (state) => state.board.columns,
  foundationCards: (state) => state.board.foundation,
  selectedCardId: (state) => state.selectedCardId,
  hasMoves: (state) => state.hasMoves,
  isGameWon: (state) => state.isGameWon,
  isGameLost: (state) => state.isGameLost,
  timer: (state) => state.game.time,
};

export default getters;
