import defaultState from './state';

const mutations = {
  RESTART(state) {
    const newState = {
      ...defaultState(),
    };

    Object.assign(state, newState);
  },
  NEW_GAME(state, isNewGame) {
    state.isNewGame = isNewGame;
  },
  SET_GAME(state, game) {
    state.game = {
      ...state.game,
      ...game,
    };
  },
  SET_GAME_WON(state, isGameWon) {
    state.isGameWon = isGameWon;
  },
  SET_GAME_LOST(state, isGameLost) {
    state.isGameLost = isGameLost;
  },
  SET_GAME_PAUSED(state, isGamePaused) {
    state.isGamePaused = isGamePaused;
  },
  SET_TIMER_PAUSED(state, isTimerPaused) {
    state.isTimerPaused = isTimerPaused;
  },
  INCREMENT_MOVES(state) {
    state.game.moves += 1;
  },
  UPDATE_GAME_TIME(state) {
    state.game.time += 1;
  },
  SHOW_RULES(state, showRules) {
    state.showRules = showRules;
  },
  SHOW_NEW_GAME(state, showNewGame) {
    state.showNewGame = showNewGame;
  },
};

export default mutations;
