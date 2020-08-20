import user from '@/services/user';

const actions = {
  async initUser({ commit }) {
    const stats = user.getUserStats();
    const luid = user.getLocalUser();
    const suid = await user.getServerUser(luid);

    commit('SET_USER_GAME_STATS', stats);
    commit('SET_USER_ID', luid);
    commit('SET_USER_SID', suid);
  },
  setUserStats({ commit }, stats) {
    user.setUserStats(stats);

    commit('SET_USER_GAME_STATS', stats);
  },
};

export default actions;
