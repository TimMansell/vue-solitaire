const getters = {
  cards: ({ cards }) => cards,
  foundation: ({ foundation }) => foundation,
  placeholders: ({ placeholders }) => placeholders,
  selectedCardId: ({ selectedCardId }) => selectedCardId,
  draggedCards: ({ draggedCards }) => draggedCards,
  draggedCardsIDs: ({ draggedCards }) => draggedCards.map(({ id }) => id),
  hasFoundations: ({ foundation }) => foundation.flat().length > 0,
  isEmptyBoard: ({ foundation, cards }) =>
    !foundation.flat().length && !cards.flat().length,
};

export default getters;
