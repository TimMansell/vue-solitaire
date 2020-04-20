import Vue from 'vue';
import defaultState from './state';

const mutations = {
  RESTART_GAME(state) {
    Object.assign(state, defaultState);
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
  REVEAL_CARDS(state, cardsColumn) {
    Vue.set(state.board.cards, cardsColumn.column, cardsColumn.cards);
  },
  SET_AUTO_REVEAL_CARDS(state, isToReveal) {
    state.config.autoRevealCards = isToReveal;
  },
};

export default mutations;
