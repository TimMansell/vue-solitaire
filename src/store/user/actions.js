import { socketConnect, socketEmit, socketOn } from '@/services/ws';
import { initUser } from '@/services/user';

const actions = {
  initUser({ commit, state }) {
    const { luid } = state;
    const uid = luid || initUser();

    socketConnect(() => {
      socketEmit('setUser', uid);
    });

    socketOn('setUser', (user) => {
      commit('SET_USER_NAME', user);
    });

    socketOn('getUserHistory', (games) => {
      commit('SET_USER_GAMES', games);
    });

    commit('SET_USER_ID', uid);
  },
  createUser({ getters }) {
    const { uid, name } = getters;

    if (name) return;

    socketEmit('createUser', uid);
  },
  getAllGames({ commit, getters }, params) {
    const { uid } = getters;

    commit('SET_USER_GAMES', []);

    socketEmit('getUserHistory', { uid, ...params });
  },
};

export default actions;
