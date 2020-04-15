const getters = {
  shuffledCards: (state) => state.shuffledCards,
  boardCards: (state) => state.boardCards,
  toMove: (state) => state.selectedCards[0],
  aces: (state) => state.foundationCards,
  rules: (state) => state.rules,
};

export default getters;
