import { initUser } from '@/services/user';

const actions = {
  initUser({ commit, state }) {
    const { luid } = state;
    const uid = luid || initUser();

    commit('SET_USER_ID', uid);
  },
  setUser({ commit }, name) {
    commit('SET_USER_NAME', name);
  },
  setUserGames({ commit }, games) {
    commit('SET_USER_GAMES', games);
  },
  getAllGames({ dispatch }, params) {
    dispatch('setUserGames', []);

    dispatch('emit', {
      name: 'userGames',
      params,
    });
  },
};

export default actions;
