const getters = {
  boardCards: (state) => state.board.cards,
  foundationCards: (state) => state.board.foundation,
  selectedCardId: (state) => state.selectedCardId,
  hasMoves: (state) => state.hasMoves,
  draggedCards: (state) => state.draggedCards,
};

export default getters;
