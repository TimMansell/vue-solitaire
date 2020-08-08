const getters = {
  boardCards: (state) => state.board.cards,
  foundationCards: (state) => state.board.foundation,
  selectedCardId: (state) => state.selectedCardId,
  isGameWon: (state) => state.isGameWon,
  hasMoves: (state) => state.hasMoves,
};

export default getters;
