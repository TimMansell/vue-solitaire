import user from '@/services/user';

const actions = {
  initLocalUser({ commit }) {
    const luid = user.getLocalUser();

    console.log({ luid });

    commit('SET_USER_ID', luid);
  },
  async initServerUser({ dispatch, state }) {
    const { isUserSavedOnServer, hasUserPlayedAGame } = state;

    if (!isUserSavedOnServer && hasUserPlayedAGame) {
      await dispatch('checkUserExistsOnServer');
    }
  },
  async checkUserExistsOnServer({ commit, dispatch, state }) {
    const { luid } = state;
    const { exists } = await user.getUser(luid);

    if (!exists) {
      await dispatch('createUserOnServer', luid);
    }

    commit('SET_USER_EXISTS', true);
  },
  async createUserOnServer(_, luid) {
    await user.createUserOnServer(luid);
  },
  setUserHasPlayed({ commit }) {
    commit('SET_USER_HAS_PLAYED', true);
  },
  async getAllGames({ commit, state }, params) {
    const { luid } = state;
    const userHistory = await user.getUsersGames(luid, params);

    commit('SET_USER_GAMES', userHistory);
  },
};

export default actions;
