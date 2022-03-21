import { initUser } from '@/services/user';

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

    dispatch('emit', {
      name: 'getUserHistory',
      params,
    });
  },
};

export default actions;
