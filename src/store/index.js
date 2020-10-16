import createPersistedState from 'vuex-persistedstate';
import Vue from 'vue';
import Vuex from 'vuex';
import solitaire from './solitaire';
import user from './user';
import stats from './stats';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    solitaire,
    user,
    stats,
  },
  plugins: [createPersistedState()],
});
