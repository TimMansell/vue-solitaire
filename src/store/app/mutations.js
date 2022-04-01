import defaultState from './state';

const mutations = {
  RESTART_APP(state) {
    const newState = {
      ...defaultState(),
    };

    Object.assign(state, newState);
  },
  SET_IS_OUTDATED_VERSION(state, isOldVersion) {
    state.isOldVersion = isOldVersion;
  },
  SET_VERSION(state, version) {
    state.version = version;
  },
  SET_HAS_UPDATED(state, hasGameUpdated) {
    state.hasGameUpdated = hasGameUpdated;
  },
  SET_GAME_PAUSED(state, isGamePaused) {
    state.isGamePaused = isGamePaused;
  },
  SET_OVERLAY_VISIBLE(state) {
    state.isOverlayVisible = !state.isOverlayVisible;
  },
};

export default mutations;
