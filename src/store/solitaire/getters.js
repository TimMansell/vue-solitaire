const getters = {
  cards: (state) => state.cards,
  foundation: (state) => state.foundation,
  placeholders: (state) => state.placeholders,
  selectedCardId: (state) => state.selectedCardId,
  draggedCards: (state) => state.draggedCards,
  draggedCardsIDs: (state) => state.draggedCards.map(({ id }) => id),
  hasFoundations: (state) => state.foundation.flat().length > 0,
  isEmptyBoard: (state) =>
    !state.foundation.flat().length && !state.cards.flat().length,
};

export default getters;
