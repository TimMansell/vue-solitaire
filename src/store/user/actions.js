import user from '@/services/user';

const actions = {
  initUser({ commit, state }) {
    const { luid } = state;
    const uid = luid || user.initUser();

    commit('SET_USER_ID', uid);
  },
  async getUser({ commit, state }) {
    const { luid } = state;
    const { exists, name } = await user.getUser(luid);

    commit('SET_USER_NAME', name);
    commit('SET_USER_EXISTS', exists);
  },
  async createUser({ commit, state }) {
    const { luid, existsOnServer } = state;

    if (!existsOnServer) {
      const { name } = await user.createUser(luid);

      commit('SET_USER_NAME', name);
      commit('SET_USER_EXISTS', true);
    }
  },
  async getAllGames({ commit, state }, params) {
    const { luid } = state;
    const userHistory = await user.getUsersGames(luid, params);

    commit('SET_USER_GAMES', userHistory);
  },
};

export default actions;
