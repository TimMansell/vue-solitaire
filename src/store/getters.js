const getters = {
  boardCards: (state) => state.board.cards,
  foundationCards: (state) => state.board.foundation,
  selectedCardId: (state) => state.selectedCardId,
  settings: (state) => state.settings,
};

export default getters;
