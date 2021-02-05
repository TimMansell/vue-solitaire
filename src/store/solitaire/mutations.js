import defaultState from './state';

const mutations = {
  RESTART_GAME(state) {
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
  SET_BOARD(state, deck) {
    state.board.cards = deck;
  },
  SET_FOUNDATIONS(state, foundationColumns) {
    state.board.foundation = foundationColumns;
  },
  SELECT_CARD(state, id) {
    state.selectedCardId = id;
  },
  UNSELECT_CARD(state) {
    state.selectedCardId = null;
  },
  SET_HAS_MOVES(state, hasMoves) {
    state.hasMoves = hasMoves;
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
  DRAG_CARDS(state, cards) {
    state.draggedCards = cards;
  },
  CLEAR_DRAG_CARDS(state) {
    state.draggedCards = [];
  },
};

export default mutations;
