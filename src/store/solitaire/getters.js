const getters = {
  cards: (state) => state.cards,
  foundation: (state) => state.foundation,
  placeholders: (state) => state.placeholders,
  selectedCardId: (state) => state.selectedCardId,
  draggedCards: (state) => state.draggedCards,
  draggedCardsIDs: (state) => state.draggedCards.map(({ id }) => id),
  hasCards: (state) => state.cards.flat().length > 0,
  hasFullFoundations: (state) => state.foundation.flat().length === 52,
  emptyBoard: (state) =>
    !state.foundation.flat().length && !state.cards.flat().length,
};

export default getters;
