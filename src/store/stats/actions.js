import db from '@/services/db';

const actions = {
  async getStatsCount({ commit, rootState }) {
    const { suid } = rootState.user;

    const { error, response } = await db.getStatsCount(suid);

    if (!error) {
      commit('SET_GLOBAL_STATS', { ...response.globalStats });
      commit('SET_USER_STATS', { ...response.userStats });
    }
  },
  async getGlobalStats({ commit }) {
    const { error, response } = await db.getGlobalStats();

    if (!error) {
      commit('SET_FULL_STATS', { ...response.globalStats });
      commit('SET_GLOBAL_STATS', { ...response.globalStats });
    }
  },
  async getUserStats({ commit, rootState }) {
    const { suid } = rootState.user;
    const { error, response } = await db.getUserStats(suid);

    if (!error) {
      commit('SET_FULL_STATS', { ...response.userStats });
      commit('SET_USER_STATS', { ...response.userStats });
    }
  },
  toggleStats({ commit, state }) {
    const showStats = !state.showStats;

    commit('SHOW_STATS', showStats);
  },
};

export default actions;
