import db from '@/services/db';

const actions = {
  async getStatsCount({ commit, rootState }) {
    const { luid } = rootState.user;

    const { error, response } = await db.getStatsCount(luid);
    const { userStats, globalStats } = response;

    if (!error) {
      commit('SET_USER_GAME_COUNT', userStats);
      commit('SET_GLOBAL_GAME_COUNT', globalStats);
      commit('SET_GLOBAL_PLAYER_COUNT', globalStats);
    }
  },
  async getStats({ commit, rootState }) {
    const { luid } = rootState.user;
    const { error, response } = await db.getStats(luid);
    const { userStats, globalStats } = response;

    if (!error) {
      commit('SET_USER_STATS', userStats);
      commit('SET_GLOBAL_STATS', globalStats);
      commit('SET_GLOBAL_GAME_COUNT', globalStats);
    }
  },
  toggleStats({ commit, state }) {
    const showStats = !state.showStats;

    commit('SHOW_STATS', showStats);
  },
  clearStats({ commit }) {
    commit('CLEAR_STATS');
  },
  toggleLeaderboards({ commit, state }) {
    const showLeaderboards = !state.showLeaderboards;

    commit('SHOW_LEADERBOARDS', showLeaderboards);
  },
  async getLeaderboards({ commit }, params) {
    const { error, response } = await db.getLeaderboards(params);

    const {
      leaderboards: { moves },
    } = response;

    if (!error) {
      commit('SET_LEADERBOARDS', moves);
    }
  },
};

export default actions;
