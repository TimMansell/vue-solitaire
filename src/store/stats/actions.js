import { socketConnect, socketEmit, socketOn } from '@/services/ws';

const actions = {
  initStats({ dispatch }) {
    socketConnect(() => {
      dispatch('getUsersGamesPlayed');
    });

    socketOn('setUserGamesPlayed', (games) => {
      dispatch('setUserGamesPlayed', games);
    });

    socketOn('setGlobalGamesPlayed', (games) => {
      dispatch('setGlobalGamesPlayed', games);
    });

    socketOn('setPlayerCount', (players) => {
      dispatch('setPlayerCount', players);
    });

    socketOn('setOnlinePlayerCount', (players) => {
      dispatch('setOnlinePlayerCount', players);
    });

    socketOn('setStats', (stats) => {
      dispatch('setStats', stats);
    });

    socketOn('setLeaderboards', (leaderboards) => {
      dispatch('setLeaderboards', leaderboards);
    });
  },
  getUsersGamesPlayed({ getters }) {
    const { uid } = getters;

    socketEmit('getUsersGamesPlayed', uid);
  },
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
  setLeaderboards({ commit }, leaderboards) {
    commit('SET_LEADERBOARDS', leaderboards);
  },
  getStats({ dispatch, getters }) {
    const { uid } = getters;
    const stats = { userStats: [], globalStats: [] };

    dispatch('setStats', stats);

    socketEmit('getStats', uid);
  },
  getLeaderboards({ commit }, params) {
    commit('SET_LEADERBOARDS', []);

    socketEmit('getLeaderboards', params);
  },
  clearLeaderboards({ commit }) {
    commit('SET_LEADERBOARDS', []);
  },
};

export default actions;
