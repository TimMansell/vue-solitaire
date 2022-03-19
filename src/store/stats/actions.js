import { emit } from '@/services/ws';

const actions = {
  setUserGamesPlayed({ commit }, games) {
    commit('SET_USER_GAME_COUNT', games);
  },
  setGlobalGamesPlayed({ commit }, games) {
    commit('SET_GLOBAL_GAME_COUNT', games);
  },
  setPlayerCount({ commit }, players) {
    commit('SET_GLOBAL_PLAYER_COUNT', players);
  },
  setOnlinePlayerCount({ commit }, players) {
    commit('SET_ONLINE_PLAYER_COUNT', players);
  },
  setStats({ commit }, { userStats, globalStats }) {
    commit('SET_USER_STATS', userStats);
    commit('SET_GLOBAL_STATS', globalStats);
  },
  getStats({ dispatch }) {
    dispatch('setStats', { userStats: [], globalStats: [] });

    emit('getStats');
  },
  setLeaderboards({ commit }, leaderboards) {
    commit('SET_LEADERBOARDS', leaderboards);
  },
  getLeaderboards({ dispatch }, params) {
    dispatch('clearLeaderboards');

    emit('getLeaderboards', params);
  },
  clearLeaderboards({ dispatch }) {
    dispatch('setLeaderboards', []);
  },
};

export default actions;
