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
  },
  getUsersGamesPlayed({ dispatch, getters }) {
    const { uid } = getters;

    socketEmit('getUsersGamesPlayed', uid, (games) => {
      dispatch('setUserGamesPlayed', games);
    });
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
  getStats({ commit, getters }) {
    const { uid } = getters;

    commit('SET_USER_STATS', []);
    commit('SET_GLOBAL_STATS', []);

    socketEmit('getStats', uid, ({ userStats, globalStats }) => {
      commit('SET_USER_STATS', userStats);
      commit('SET_GLOBAL_STATS', globalStats);
    });
  },
  getLeaderboards({ commit }, params) {
    commit('SET_LEADERBOARDS', []);

    socketEmit('getLeaderboards', params, (leaderboards) => {
      commit('SET_LEADERBOARDS', leaderboards);
    });
  },
  clearLeaderboards({ commit }) {
    commit('SET_LEADERBOARDS', []);
  },
};

export default actions;
