import db from '@/services/db';

const actions = {
  async getStatsCount({ commit, rootState }) {
    const { luid } = rootState.user;

    const { error, response } = await db.getStatsCount(luid);
    const { userStats, globalStats } = response;

    if (!error) {
      commit('SET_GLOBAL_STATS', globalStats);
      commit('SET_USER_STATS', userStats);
    }
  },
  async getGlobalStats({ commit }) {
    const { error, response } = await db.getGlobalStats();
    const { globalStats } = response;

    if (!error) {
      commit('SET_FULL_STATS', globalStats);
      commit('SET_GLOBAL_STATS', globalStats);
    }
  },
  async getUserStats({ commit, rootState }) {
    const { luid } = rootState.user;
    const { error, response } = await db.getUserStats(luid);
    const { userStats } = response;

    if (!error) {
      commit('SET_FULL_STATS', userStats);
      commit('SET_USER_STATS', userStats);
    }
  },
  toggleStats({ commit, state }) {
    const showStats = !state.showStats;

    commit('SHOW_STATS', showStats);
  },
};

export default actions;
