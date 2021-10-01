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
  SET_BOARD(state, cards) {
    state.cards = cards;
  },
  SET_FOUNDATIONS(state, foundation) {
    state.foundation = foundation;
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
