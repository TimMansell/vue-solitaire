import user from '@/services/user';

const actions = {
  initLocalUser({ commit }) {
    const luid = user.getLocalUser();

    commit('SET_USER_ID', luid);
  },
};

export default actions;
