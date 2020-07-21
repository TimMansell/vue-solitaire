const getters = {
  boardCards: (state) => state.board.cards,
  foundationCards: (state) => state.board.foundation,
  selectedCardId: (state) => state.selectedCardId,
  isGameWon: (state) => state.isGameWon,
  hasNoMoves: (state) => state.hasNoMoves,
};

export default getters;
