const getters = {
  cards: ({ cards }) => cards,
  foundation: ({ foundation }) => foundation,
  game: ({ moves, time }) => ({
    moves,
    time,
  }),
  hasGameWon: ({ hasGameWon }) => hasGameWon,
  hasGameLost: ({ hasGameLost }) => hasGameLost,
  timer: ({ time }) => time,
  moves: ({ moves }) => moves.length,
  placeholders: ({ placeholders }) => placeholders,
  selectedCardId: ({ selectedCardId }) => selectedCardId,
  draggedCards: ({ draggedCards }) => draggedCards,
  draggedCardsIDs: ({ draggedCards }) => draggedCards.map(({ id }) => id),
  isEmptyBoard: ({ foundation, cards }) =>
    !foundation.flat().length && !cards.flat().length,
};

export default getters;
