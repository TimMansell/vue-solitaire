import user from '@/services/user';

const actions = {
  initLocalUser({ commit }) {
    const luid = user.getLocalUser();

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
    const userExistsOnServer = await user.checkUserExistsOnServer(luid);

    if (!userExistsOnServer) {
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
};

export default actions;
