import Vue from 'vue';
import Vuex from 'vuex';
import shuffle from 'lodash.shuffle';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cards: {
      values: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
      suits: ['C', 'S', 'H', 'D'],
    },
    shuffledCards: [],
    rules: {
      columns: [1, 2, 3, 4, 5, 6, 7],
    },
  },
  mutations: {
    shuffleCards(state) {
      const { values, suits } = state.cards;

      const deck = values.map((value) => suits.map((suit) => `${value}${suit}`));
      const shuffledDeck = shuffle(deck);

      state.shuffledCards = shuffledDeck;
    },
  },
  actions: {
    initGame({ commit }) {
      commit('shuffleCards');
    },
  },
  getters: {
    shuffledCards: (state) => state.shuffledCards,
    rules: (state) => state.rules,
  },
  modules: {
  },
});
