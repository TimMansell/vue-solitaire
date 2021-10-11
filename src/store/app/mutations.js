import defaultState from './state';

const mutations = {
  RESTART_APP(state, hasConnection) {
    const newState = {
      ...defaultState(),
      hasConnection,
    };

    Object.assign(state, newState);
  },
  SET_HAS_CONNECTION(state, hasConnection) {
    state.hasConnection = hasConnection;
  },
  SET_VERSION_MATCH(state, versionMatch) {
    state.versionMatch = versionMatch;
  },
  SET_GAME_LOADING(state, isLoading) {
    state.isGameLoading = isLoading;
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
  SET_OFFLINE_MOVE(state, hasMove) {
    state.hasOfflineMove = hasMove;
  },
  SET_OFFLINE_GAME(state, isOfflineGame) {
    state.isOfflineGame = isOfflineGame;
  },
};

export default mutations;
