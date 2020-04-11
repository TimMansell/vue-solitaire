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
      columns: [7, 7, 7, 7, 6, 6, 6, 6],
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
      const { rules, shuffledCards } = state;

      const showCards = (cards, offset = 0) => cards.map((card, index) => {
        if ((index + offset) % 2 === 0) {
          return {
            ...card,
            visible: true,
          };
        }

        return card;
      });

      const dealtCards = rules.columns.map((column, index, array) => {
        const startArray = array.slice(0, index);
        const endArray = array.slice(0, index + 1);

        const calcOffset = (accumulator, currentValue) => accumulator + currentValue;

        const startIndex = startArray.reduce(calcOffset, 0);
        const endIndex = endArray.reduce(calcOffset, 0);

        const cards = shuffledCards.slice(startIndex, endIndex);

        // Offset by one.
        if (index > 3) {
          return showCards(cards, 1);
        }

        return showCards(cards);
      });

      dealtCards.forEach((cards, index) => {
        Vue.set(state.board.cards, index, dealtCards[index]);
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
