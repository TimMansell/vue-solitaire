const mutations = {
  SET_USER_ID(state, luid) {
    state.luid = luid;
  },
  SET_USER_EXISTS(state, userSaved) {
    state.isUserSavedOnServer = userSaved;
  },
  SET_USER_HAS_PLAYED(state, hasUserPlayedAGame) {
    state.hasUserPlayedAGame = hasUserPlayedAGame;
  },
};

export default mutations;
