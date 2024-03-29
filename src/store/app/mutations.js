const mutations = {
  SET_IS_OUTDATED_VERSION(state, isOldVersion) {
    state.isOldVersion = isOldVersion;
  },
  SET_HAS_UPDATED(state, hasGameUpdated) {
    state.hasGameUpdated = hasGameUpdated;
  },
  SET_GAME_PAUSED(state, isGamePaused) {
    state.isGamePaused = isGamePaused;
  },
};

export default mutations;
