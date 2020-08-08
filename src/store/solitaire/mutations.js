import Vue from 'vue';
import defaultState from './state';

const mutations = {
  RESTART_GAME(state) {
    Object.assign(state, defaultState());
  },
  SET_GAME_WON(state, isGameWon) {
    state.isGameWon = isGameWon;
  },
  SET_BOARD(state, deck) {
    deck.forEach((cards, index) => {
      Vue.set(state.board.cards, index, cards);
    });
  },
  SET_FOUNDATIONS(state, foundationColumns) {
    foundationColumns.forEach((foundation, index) => {
      Vue.set(state.board.foundation, index, foundation);
    });
  },
  SELECT_CARD(state, id) {
    state.selectedCardId = id;
  },
  UNSELECT_CARD(state) {
    state.selectedCardId = null;
  },
  SET_REMAINING_MOVES(state, hasMoves) {
    state.hasMoves = hasMoves;
  },
};

export default mutations;
