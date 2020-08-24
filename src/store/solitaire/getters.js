const getters = {
  boardCards: (state) => state.board.cards,
  foundationCards: (state) => state.board.foundation,
  selectedCardId: (state) => state.selectedCardId,
  hasMoves: (state) => state.hasMoves,
  isGameWon: (state) => state.isGameWon,
  isGameLost: (state) => state.isGameLost,
  timer: (state) => state.game.time,
};

export default getters;
