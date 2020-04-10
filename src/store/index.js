import Vue from 'vue';
import Vuex from 'vuex';
import shuffle from 'lodash.shuffle';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cards: {
      values: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
      suits: ['c', 's', 'h', 'd'],
    },
    shuffledCards: [],
    board: {
      cards: [],
    },
    rules: {
      columns: [1, 2, 3, 4, 5, 6, 7],
    },
  },
  mutations: {
    shuffleCards(state) {
      const { values, suits } = state.cards;

      const deck = values.flatMap((value) => suits.map((suit) => {
        const card = {
          value,
          suit,
          visible: false,
        };

        return card;
      }));

      const shuffledDeck = shuffle(deck);

      state.shuffledCards = shuffledDeck;
    },
    dealCards(state) {
      const { shuffledCards } = state;

      const isLastItem = (col, index, card) => {
        if (index === col.length - 1) {
          return {
            ...card,
            visible: true,
          };
        }

        return card;
      };

      const col1 = shuffledCards.splice(0, 1);
      const col2 = shuffledCards.splice(1, 2);
      const col3 = shuffledCards.splice(3, 3);
      const col4 = shuffledCards.splice(6, 4);
      const col5 = shuffledCards.splice(10, 5);
      const col6 = shuffledCards.splice(15, 6);
      const col7 = shuffledCards.splice(21, 7);

      const allColumns = [
        col1.map((card, index) => isLastItem(col1, index, card)),
        col2.map((card, index) => isLastItem(col2, index, card)),
        col3.map((card, index) => isLastItem(col3, index, card)),
        col4.map((card, index) => isLastItem(col4, index, card)),
        col5.map((card, index) => isLastItem(col5, index, card)),
        col6.map((card, index) => isLastItem(col6, index, card)),
        col7.map((card, index) => isLastItem(col7, index, card)),
      ];

      allColumns.forEach((a, index) => {
        Vue.set(state.board.cards, index, allColumns[index]);
      });
    },
  },
  actions: {
    initGame({ commit }) {
      commit('shuffleCards');
      commit('dealCards');
    },
  },
  getters: {
    shuffledCards: (state) => state.shuffledCards,
    boardCards: (state) => state.board.cards,
    rules: (state) => state.rules,
  },
  modules: {
  },
});
