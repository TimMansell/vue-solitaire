const mutations = {
  SET_USER_ID(state, luid) {
    state.luid = luid;
  },
  SET_USER_EXISTS(state, existsOnServer) {
    state.existsOnServer = existsOnServer;
  },
  SET_USER_NAME(state, name) {
    state.name = name;
  },
  SET_USER_GAMES(state, gameHistory) {
    state.gameHistory = gameHistory;
  },
};

export default mutations;
