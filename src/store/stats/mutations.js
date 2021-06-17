const mutations = {
  SET_GLOBAL_STATS(state, stats) {
    const { globalStats } = state;

    state.globalStats = {
      ...globalStats,
      ...stats,
    };
  },
  SET_USER_STATS(state, stats) {
    const { userStats } = state;

    state.userStats = {
      ...userStats,
      ...stats,
    };
  },
  SET_FULL_STATS(state, stats) {
    const { fullStats } = state;

    state.fullStats = {
      ...fullStats,
      ...stats,
    };
  },
  CLEAR_FULL_STATS(state) {
    state.fullStats = {};
  },
  SHOW_STATS(state, showStats) {
    state.showStats = showStats;
  },
};

export default mutations;
