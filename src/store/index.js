import Vue from 'vue';
import Vuex from 'vuex';
import solitaireModule from './solitaire';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    solitaireModule,
  },
});
