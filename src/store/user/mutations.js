const mutations = {
  SET_USER_ID(state, luid) {
    state.luid = luid;
  },
  SET_USER_EXISTS(state, exists) {
    state.existsOnServer = exists;
  },
  SET_USER_NAME(state, name) {
    state.name = name;
  },
  SET_USER_HAS_PLAYED(state, hasPlayedAGame) {
    state.hasPlayedAGame = hasPlayedAGame;
  },
  SET_USER_GAMES(state, gameHistory) {
    state.gameHistory = gameHistory;
  },
};

export default mutations;
