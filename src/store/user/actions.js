import user from '@/services/user';

const actions = {
  async initUser({ commit }) {
    const luid = user.getLocalUser();
    const userExistsOnServer = await user.checkUserExistsOnServer(luid);

    if (!userExistsOnServer) {
      await user.createUserOnServer(luid);
    }

    commit('SET_USER_ID', luid);
  },
};

export default actions;
