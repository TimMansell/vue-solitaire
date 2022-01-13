import defaultState from './state';

const mutations = {
  RESTART_APP(state) {
    const newState = {
      ...defaultState(state),
    };

    Object.assign(state, newState);
  },
  SET_IS_ONLINE(state, isOnline) {
    state.connection.isOnline = isOnline;
  },
  SET_IS_CONNECTING(state, isConnecting) {
    state.connection.isConnecting = isConnecting;
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
  SET_GAME_OUTCOME(state, hasGameWon) {
    state.gameOutcome = {
      hasGameWon,
      hasGameLost: !hasGameWon,
    };
  },
  SET_GAME_PAUSED(state, isGamePaused) {
    state.isGamePaused = isGamePaused;
  },
  SET_OVERLAY_VISIBLE(state) {
    state.isOverlayVisible = !state.isOverlayVisible;
  },
  SET_MOVES(state, move) {
    state.game.moves = [...state.game.moves, move];
  },
  UPDATE_GAME_TIME(state) {
    state.game.time += 1;
  },
};

export default mutations;
