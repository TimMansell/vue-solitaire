const getters = {
  shuffledCards: (state) => state.shuffledCards,
  boardCards: (state) => state.board.cards,
  selectedCards: (state) => state.selected,
  aces: (state) => state.board.aces,
  rules: (state) => state.rules,
};

export default getters;
