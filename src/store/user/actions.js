import user from '@/services/user';

const actions = {
  async initUser({ commit }) {
    const luid = user.getLocalUser();
    // const suid = await user.getServerUser(luid);

    commit('SET_USER_ID', luid);
    // commit('SET_USER_SID', suid);
  },
};

export default actions;
