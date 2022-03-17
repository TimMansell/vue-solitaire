import createPersistedState from 'vuex-persistedstate';
import Vue from 'vue';
import Vuex from 'vuex';
import app from './app';
import connection from './connection';
import solitaire from './solitaire';
import user from './user';
import stats from './stats';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    connection,
    solitaire,
    user,
    stats,
  },
  plugins: [createPersistedState()],
});
