import defaultState from './state';

const mutations = {
  RESTART_GAME(state) {
    const newState = {
      ...defaultState(),
    };

    Object.assign(state, newState);
  },
  SET_BOARD(state, cards) {
    state.cards = cards;
  },
  SET_FOUNDATIONS(state, foundation) {
    state.foundation = foundation;
  },
  SET_GAME_OUTCOME(state, { hasGameWon, hasGameLost }) {
    state.hasGameWon = hasGameWon;
    state.hasGameLost = hasGameLost;
  },
  SET_MOVES(state, move) {
    state.moves = [...state.moves, move];
  },
  UPDATE_GAME_TIME(state) {
    state.time += 1;
  },
  SELECT_CARD(state, id) {
    state.selectedCardId = id;
  },
  UNSELECT_CARD(state) {
    state.selectedCardId = null;
  },
  DRAG_CARDS(state, cards) {
    state.draggedCards = cards;
  },
  CLEAR_DRAG_CARDS(state) {
    state.draggedCards = [];
  },
};

export default mutations;
