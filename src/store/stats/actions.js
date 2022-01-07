import { socketConnect, socketEmit, socketOn } from '@/services/ws';

const actions = {
  initStats({ commit, getters }) {
    const { uid } = getters;

    socketConnect(() => {
      socketEmit('getCounts', uid);
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
    });

    socketOn('getLeaderboards', (leaderboards) => {
      commit('SET_LEADERBOARDS', leaderboards);
    });
  },
  getStats({ commit, getters }) {
    const { uid } = getters;

    commit('SET_USER_STATS', []);
    commit('SET_GLOBAL_STATS', []);

    socketEmit('getStats', uid);
  },
  getLeaderboards({ commit }, params) {
    commit('SET_LEADERBOARDS', []);

    socketEmit('getLeaderboards', params);
  },
};

export default actions;
