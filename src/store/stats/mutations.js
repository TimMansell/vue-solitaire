const mutations = {
  SET_GLOBAL_STATS_COUNT(state, stats) {
    state.globalStats = stats;
  },
  SET_FULL_STATS(state, stats) {
    state.fullStats = stats;
  },
  SHOW_STATS(state, showStats) {
    state.showStats = showStats;
  },
};

export default mutations;
