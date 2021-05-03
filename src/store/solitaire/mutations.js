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
  DRAG_CARDS(state, cards) {
    state.draggedCards = cards;
  },
  CLEAR_DRAG_CARDS(state) {
    state.draggedCards = [];
  },
};

export default mutations;
