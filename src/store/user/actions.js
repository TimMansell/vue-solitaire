import { socketConnect, socketEmit } from '@/services/ws';
import { initUser } from '@/services/user';

const actions = {
  initUser({ dispatch }) {
    dispatch('setUser');

    socketConnect(() => {
      dispatch('getUser');
    });
  },
  setUser({ commit, state }) {
    const { luid } = state;
    const uid = luid || initUser();

    commit('SET_USER_ID', uid);
  },
  getUser({ commit, getters }) {
    const { uid } = getters;

    socketEmit('getUser', uid, (user) => {
      commit('SET_USER_NAME', user);
    });
  },
  createUser({ commit, getters }) {
    const { uid, name } = getters;

    if (name) return;

    socketEmit('createUser', uid, (user) => {
      commit('SET_USER_NAME', user);
    });
  },
  getAllGames({ commit, getters }, params) {
    const { uid } = getters;

    commit('SET_USER_GAMES', []);

    socketEmit('getUserHistory', { uid, ...params }, (games) => {
      commit('SET_USER_GAMES', games);
    });
  },
};

export default actions;
