import Vue from 'vue';
import Vuex from 'vuex';
import solitaireModule from './solitaire';
import userModule from './user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    solitaireModule,
    userModule,
  },
});
