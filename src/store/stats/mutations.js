const mutations = {
  SET_GLOBAL_STATS(state, stats) {
    state.globalStats = stats;
  },
  SET_USER_STATS(state, stats) {
    state.fullUserStats = stats;
  },
  SHOW_STATS(state, showStats) {
    state.showStats = showStats;
  },
};

export default mutations;
