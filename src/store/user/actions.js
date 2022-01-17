import { socketConnect, socketEmit, socketOn } from '@/services/ws';
import { initUser } from '@/services/user';

const actions = {
  initUser({ dispatch }) {
    dispatch('setUser');

    socketConnect(() => {
      dispatch('getUser');
    });

    socketOn('setUser', (user) => {
      dispatch('setUserName', user);
    });

    socketOn('setUserHistory', (games) => {
      dispatch('setUserHistory', games);
    });
  },
  setUser({ commit, state }) {
    const { luid } = state;
    const uid = luid || initUser();

    commit('SET_USER_ID', uid);
  },
  getUser({ getters }) {
    const { uid } = getters;

    socketEmit('getUser', uid);
  },
  setUserName({ commit }, user) {
    commit('SET_USER_NAME', user);
  },
  createUser({ getters }) {
    const { uid, name } = getters;

    if (name) return;

    socketEmit('createUser', uid);
  },
  setUserHistory({ commit }, games) {
    commit('SET_USER_GAMES', games);
  },
  getAllGames({ dispatch, getters }, params) {
    const { uid } = getters;

    dispatch('setUserHistory', []);

    socketEmit('getUserHistory', { uid, ...params });
  },
};

export default actions;
