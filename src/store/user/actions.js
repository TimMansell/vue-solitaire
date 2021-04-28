import user from '@/services/user';

const actions = {
  async initUser({ commit, dispatch }) {
    const luid = user.getLocalUser();
    const userExistsOnServer = await user.checkUserExistsOnServer(luid);

    if (!userExistsOnServer) {
      dispatch('createUser', luid);
    }

    commit('SET_USER_ID', luid);
  },
  async createUser(_, luid) {
    await user.createUserOnServer(luid);
  },
};

export default actions;
