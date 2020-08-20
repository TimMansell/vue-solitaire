import user from '@/services/user';

const actions = {
  async initUser({ commit, state }) {
    const luid = state.luid ? state.luid : user.getLocalUser();
    const suid = state.suid ? state.suid : await user.getServerUser(luid);

    commit('SET_USER_ID', luid);
    commit('SET_USER_SID', suid);
  },
  setGameStats({ commit }, totalGames) {
    commit('SET_USER_GAME_STATS', totalGames);
  },
};

export default actions;
