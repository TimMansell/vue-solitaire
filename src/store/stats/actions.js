import { getStatsCount, getStats, getLeaderboards } from '@/services/db';

const actions = {
  async getStatsCount({ commit, rootState }) {
    const { luid } = rootState.user;
    const { userStats, globalStats } = await getStatsCount(luid);

    commit('SET_USER_GAME_COUNT', userStats);
    commit('SET_GLOBAL_GAME_COUNT', globalStats);
    commit('SET_GLOBAL_PLAYER_COUNT', globalStats);
  },
  async getStats({ commit, rootState }) {
    const { luid } = rootState.user;
    const { userStats, globalStats } = await getStats(luid);

    commit('SET_USER_STATS', userStats);
    commit('SET_GLOBAL_STATS', globalStats);
    commit('SET_GLOBAL_GAME_COUNT', globalStats);
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
    commit('SET_LEADERBOARDS', []);

    const leaderboards = await getLeaderboards(params);

    commit('SET_LEADERBOARDS', leaderboards);
  },
};

export default actions;
