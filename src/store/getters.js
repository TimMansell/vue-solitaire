const getters = {
  shuffledCards: (state) => state.shuffledCards,
  boardCards: (state) => state.board.cards,
  toMove: (state) => state.selectedCards[0],
  foundationCards: (state) => state.board.foundation,
  rules: (state) => state.rules,
};

export default getters;
