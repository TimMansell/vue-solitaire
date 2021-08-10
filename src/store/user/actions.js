import user from '@/services/user';

const actions = {
  async initUser({ commit, dispatch, state }) {
    const { luid, existsOnServer, hasPlayedAGame } = state;

    const uid = luid || user.getLocalUser();

    if (!existsOnServer) {
      await dispatch('getUser', uid);

      if (!hasPlayedAGame) {
        await dispatch('createUser', uid);
      }
    }

    commit('SET_USER_ID', uid);
  },
  async getUser({ commit }, uid) {
    const { name, exists, played } = await user.getUser(uid);

    commit('SET_USER_NAME', name);
    commit('SET_USER_EXISTS', exists);
    commit('SET_USER_HAS_PLAYED', played);
  },
  async createUser({ commit }, uid) {
    const { name, exists } = await user.createUserOnServer(uid);

    commit('SET_USER_NAME', name);
    commit('SET_USER_EXISTS', exists);
  },
  async getAllGames({ commit, state }, params) {
    const { luid } = state;
    const userHistory = await user.getUsersGames(luid, params);

    commit('SET_USER_GAMES', userHistory);
  },
};

export default actions;
