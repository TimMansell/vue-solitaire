import { initUser } from '@/services/user';
import { emit } from '@/services/ws';

const actions = {
  initUser({ commit, state }) {
    const { luid } = state;
    const uid = luid || initUser();

    commit('SET_USER_ID', uid);
  },
  setUser({ commit }, user) {
    commit('SET_USER_NAME', user);
  },
  setUserGames({ commit }, games) {
    commit('SET_USER_GAMES', games);
  },
  getAllGames({ dispatch }, params) {
    dispatch('setUserGames', []);

    emit('getUserHistory', params);
  },
};

export default actions;
