import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const getDefaultState = () => state;

const newMutations = {
  ...mutations,
  // eslint-disable-next-line no-shadow
  restartGame(state) {
    console.log('restart');

    // Object.assign(state, getDefaultState());
    const s = getDefaultState();
    Object.keys(state).forEach((key) => {
      Object.assign(state[key], s[key]);
    });
  },
};

Vue.use(Vuex);

export default new Vuex.Store({
  state: getDefaultState(),
  mutations: newMutations,
  actions,
  getters,
});
