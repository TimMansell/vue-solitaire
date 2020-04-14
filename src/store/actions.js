const actions = {
  initGame({ commit }) {
    commit('shuffleCards');
    commit('dealCards');
  },
  moveCard({ commit }, card) {
    commit('moveCard', card);
    commit('checkValidCardMove');
    commit('revealExposedHiddenCards');
  },
  moveCardToAce({ commit }) {
    commit('moveCardToAce');
    commit('revealExposedHiddenCards');
  },
  moveKingToColumn({ commit }, column) {
    commit('moveKingToColumn', column);
    commit('revealExposedHiddenCards');
  },
  dealTestCards({ commit }, deck) {
    commit('setDeck', deck);
    commit('dealCards');
  },
  setTestBoard({ commit }, deck) {
    commit('setBoard', deck);
  },
};

export default actions;
