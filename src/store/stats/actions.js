import { socketConnect, socketEmit, socketOn } from '@/services/ws';

const actions = {
  initStats({ dispatch }) {
    socketConnect(() => {
      dispatch('getGameCounts');
      dispatch('getPlayerCount');
    });

    socketOn('getUserGames', (userStats) => {
      dispatch('setUserGames', userStats);
    });

    socketOn('getGlobalGames', (globalStats) => {
      dispatch('setGlobalGames', globalStats);
    });

    socketOn('getPlayerCount', (globalStats) => {
      dispatch('setPlayerCount', globalStats);
    });

    socketOn('getStats', (stats) => {
      dispatch('setStats', stats);
    });

    socketOn('getLeaderboards', (leaderboards) => {
      dispatch('setLeaderboards', leaderboards);
    });
  },
  getGameCounts({ getters }) {
    const { uid } = getters;

    socketEmit('getGameCounts', uid);
  },
  getPlayerCount() {
    socketEmit('getPlayerCount');
  },
  setUserGames({ commit }, userStats) {
    commit('SET_USER_GAME_COUNT', userStats);
  },
  setGlobalGames({ commit }, globalStats) {
    commit('SET_GLOBAL_GAME_COUNT', globalStats);
  },
  setPlayerCount({ commit }, globalStats) {
    commit('SET_GLOBAL_PLAYER_COUNT', globalStats);
  },
  setStats({ commit }, { userStats, globalStats }) {
    commit('SET_USER_STATS', userStats);
    commit('SET_GLOBAL_STATS', globalStats);
  },
  setLeaderboards({ commit }, leaderboards) {
    commit('SET_LEADERBOARDS', leaderboards);
  },
  getStats({ dispatch, getters }) {
    const { uid } = getters;
    const stats = { userStats: [], globalStats: [] };

    dispatch('setStats', stats);

    socketEmit('getStats', uid);
  },
  getLeaderboards({ dispatch }, params) {
    dispatch('setLeaderboards', []);

    socketEmit('getLeaderboards', params);
  },
};

export default actions;
