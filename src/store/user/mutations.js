const mutations = {
  SET_USER_ID(state, luid) {
    state.luid = luid;
  },
  SET_USER_NAME(state, user) {
    state.name = user?.name;
  },
  SET_USER_GAMES(state, gameHistory) {
    state.gameHistory = gameHistory;
  },
};

export default mutations;
