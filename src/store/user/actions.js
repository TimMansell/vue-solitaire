import user from '@/services/user';

const actions = {
  initUser({ commit }) {
    const userExists = user.checkLocalUser();
    const uid = userExists ? user.getLocalUser() : user.setLocalUser();

    commit('SET_USER', uid);
  },
};

export default actions;
