import { initUser } from '@/services/user';
import { createUser, getUsersGames } from '@/services/db';

const actions = {
  initUser({ commit, state }) {
    const { luid } = state;
    const uid = luid || initUser();

    commit('SET_USER_ID', uid);

    return uid;
  },
  setUser({ commit }, { name, exists }) {
    commit('SET_USER_NAME', name);
    commit('SET_USER_EXISTS', exists);
  },
  async createUser({ state, dispatch }) {
    const { luid, existsOnServer } = state;

    if (!existsOnServer) {
      const user = await createUser(luid);

      dispatch('setUser', user);
    }
  },
  async getAllGames({ commit, state }, params) {
    const { luid } = state;

    commit('SET_USER_GAMES', []);

    const { history } = await getUsersGames(luid, params);

    commit('SET_USER_GAMES', history);
  },
};

export default actions;
