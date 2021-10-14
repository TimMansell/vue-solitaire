import { socketConnect, socketEmit, socketOn } from '@/services/ws';

const actions = {
  initStats({ commit, getters }) {
    const { uid } = getters;

    socketConnect(() => {
      socketEmit('getUserCounts', uid);
      socketEmit('getGlobalCounts');
    });

    socketOn('getUserCounts', (userStats) => {
      commit('SET_USER_GAME_COUNT', userStats);
    });

    socketOn('getGlobalCounts', (globalStats) => {
      commit('SET_GLOBAL_GAME_COUNT', globalStats);
      commit('SET_GLOBAL_PLAYER_COUNT', globalStats);
    });

    socketOn('getStats', ({ userStats, globalStats }) => {
      commit('SET_USER_STATS', userStats);
      commit('SET_GLOBAL_STATS', globalStats);
      commit('SET_GLOBAL_GAME_COUNT', globalStats);
    });

    socketOn('getLeaderboards', (leaderboards) => {
      commit('SET_LEADERBOARDS', leaderboards);
    });
  },
  getStats({ getters }) {
    const { uid } = getters;

    socketEmit('getStats', uid);
  },
  clearStats({ commit }) {
    commit('CLEAR_STATS');
  },
  getLeaderboards({ commit }, params) {
    commit('SET_LEADERBOARDS', []);

    socketEmit('getLeaderboards', params);
  },
};

export default actions;
