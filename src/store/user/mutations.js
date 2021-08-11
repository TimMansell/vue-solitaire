const mutations = {
  SET_USER_ID(state, luid) {
    state.luid = luid;
  },
  SET_USER_EXISTS(state, userSaved) {
    state.isUserSavedOnServer = userSaved;
  },
  SET_USER_NAME(state, name) {
    state.name = name;
  },
  SET_USER_HAS_PLAYED(state, hasUserPlayedAGame) {
    state.hasUserPlayedAGame = hasUserPlayedAGame;
  },
  SET_USER_GAMES(state, gameHistory) {
    state.gameHistory = gameHistory;
  },
};

export default mutations;
