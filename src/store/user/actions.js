import user from '@/services/user';

const actions = {
  initUser({ commit }) {
    const userExists = user.checkUser();
    const uid = userExists ? user.getUser() : user.setUser();

    commit('SET_USER', uid);
  },
};

export default actions;
