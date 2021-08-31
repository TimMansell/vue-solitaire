import { initUser } from '@/services/user';
import { getUser, createUser, getUsersGames } from '@/services/db';

const actions = {
  initUser({ commit, state }) {
    const { luid } = state;
    const uid = luid || initUser();

    commit('SET_USER_ID', uid);
  },
  async getUser({ commit, state }) {
    const { luid } = state;
    const { exists, name } = await getUser(luid);

    commit('SET_USER_NAME', name);
    commit('SET_USER_EXISTS', exists);
  },
  async createUser({ commit, state }) {
    const { luid, existsOnServer } = state;

    if (!existsOnServer) {
      const { name } = await createUser(luid);

      commit('SET_USER_NAME', name);
      commit('SET_USER_EXISTS', true);
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
