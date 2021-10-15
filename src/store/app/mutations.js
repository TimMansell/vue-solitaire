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
  SET_VERSION_MATCH(state, versionMatch) {
    state.versionMatch = versionMatch;
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
  UPDATE_GAME_TIME(state, time) {
    state.game.times = [...state.game.times, time];
  },
  SET_GAME_HASH(state, hash) {
    state.game.hash = hash;
  },
};

export default mutations;
