import createPersistedState from 'vuex-persistedstate';
import Vue from 'vue';
import Vuex from 'vuex';
import app from './app';
import solitaire from './solitaire';
import user from './user';
import stats from './stats';
import online from './online';
import offline from './offline';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    solitaire,
    user,
    stats,
    online,
    offline,
  },
  plugins: [createPersistedState()],
});
