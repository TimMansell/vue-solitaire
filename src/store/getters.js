const getters = {
  shuffledCards: (state) => state.shuffledCards,
  boardCards: (state) => state.board.cards,
  toMove: (state) => state.selectedCards[0],
  aces: (state) => state.board.aces,
  rules: (state) => state.rules,
};

export default getters;
