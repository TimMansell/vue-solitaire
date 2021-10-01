const getters = {
  cards: (state) => state.cards,
  foundation: (state) => state.foundation,
  placeholders: (state) => state.placeholders,
  selectedCardId: (state) => state.selectedCardId,
  draggedCards: (state) => state.draggedCards,
  draggedCardsIDs: (state) => state.draggedCards.map(({ id }) => id),
};

export default getters;
