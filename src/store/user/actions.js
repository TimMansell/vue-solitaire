import { socketConnect, socketEmit, socketOn } from '@/services/websockets';
import { initUser } from '@/services/user';

const actions = {
  initUser({ commit, state }) {
    const { luid } = state;
    const uid = luid || initUser();

    socketConnect(() => {
      socketEmit('setUser', luid);
    });

    socketOn('setUser', (user) => {
      commit('SET_USER_NAME', user);
    });

    socketOn('getUserGames', (games) => {
      commit('SET_USER_GAMES', games);
    });

    commit('SET_USER_ID', uid);
  },
  getUser({ state }) {
    return state.luid;
  },
  async getAllGames({ commit, dispatch }, params) {
    const uid = await dispatch('getUser');

    commit('SET_USER_GAMES', []);

    socketEmit('getUserGames', { uid, ...params });
  },
};

export default actions;
