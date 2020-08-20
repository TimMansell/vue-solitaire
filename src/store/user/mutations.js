const mutations = {
  SET_USER_ID(state, luid) {
    state.luid = luid;
  },
  SET_USER_SID(state, suid) {
    state.suid = suid;
  },
  SET_USER_GAME_STATS(state, stats) {
    state.userStats = stats;
  },
};

export default mutations;
