import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

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
      aces: {
        c: [],
        h: [],
        d: [],
        s: [],
      },
    },
    rules: {
      columns: [7, 7, 7, 7, 6, 6, 6, 6],
    },
    selected: {
      toMove: null,
      moveTo: null,
    },
  },
  mutations,
  actions,
  getters,
  modules: {
  },
});
