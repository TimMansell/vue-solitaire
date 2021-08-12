import user from '@/services/user';

const actions = {
  initLocalUser({ commit, state }) {
    const { luid } = state;
    const uid = luid || user.getLocalUser();

    commit('SET_USER_ID', uid);
  },
  async initServerUser({ commit, state }) {
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
