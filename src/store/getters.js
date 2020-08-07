const getters = {
  boardCards: (state) => state.board.cards,
  foundationCards: (state) => state.board.foundation,
  selectedCardId: (state) => state.selectedCardId,
  isGameWon: (state) => state.isGameWon,
  isGameLost: (state) => state.isGameLost,
  stats: (state) => state.stats,
};

export default getters;
