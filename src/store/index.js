import Vue from 'vue';
import Vuex from 'vuex';
import solitaireModule from './solitaire';
import userModule from './user';
import dbModule from './db';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    solitaireModule,
    userModule,
    dbModule,
  },
});
