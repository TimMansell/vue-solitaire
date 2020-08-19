import Vue from 'vue';
import Vuex from 'vuex';
import solitaire from './solitaire';
import user from './user';
import db from './db';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    solitaire,
    user,
    db,
  },
});
