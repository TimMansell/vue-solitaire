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
};

export default actions;
