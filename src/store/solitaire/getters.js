const getters = {
  cards: (state) => state.cards,
  foundation: (state) => state.foundation,
  selectedCardId: (state) => state.selectedCardId,
  hasMoves: (state) => state.hasMoves,
  draggedCards: (state) => state.draggedCards,
  draggedCardsIDs: (state) => state.draggedCards.map(({ id }) => id),
};

export default getters;
