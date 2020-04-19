import Vue from 'vue';
import defaultState from './state';

const mutations = {
  RESTART_GAME(state) {
    Object.assign(state, defaultState);
  },
  SET_BOARD(state, deck) {
    deck.forEach((cards, index) => {
      Vue.set(state.board.cards, index, deck[index]);
    });
  },
  SET_FOUNDATIONS(state, foundationColumns) {
    foundationColumns.forEach((foundation, index) => {
      Vue.set(state.board.foundation, index, []);
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
  SET_COLUMN(state, columnNo) {
    state.selectedColumn = columnNo;
  },
  MOVE_CARDS_TO_COLUMN(state, { cardsToColumn }) {
    Vue.set(state.board.cards, cardsToColumn.column, cardsToColumn.cards);
  },
  MOVE_CARD_TO_FOUNDATION(state, { cardsToColumn }) {
    Vue.set(state.board.foundation, cardsToColumn.column, cardsToColumn.cards);
  },
  REMOVE_CARDS_FROM_COLUMN(state, { cardFromColumn }) {
    Vue.set(state.board.cards, cardFromColumn.column, cardFromColumn.cards);
  },
};

export default mutations;
