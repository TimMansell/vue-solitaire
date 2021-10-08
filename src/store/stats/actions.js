import { socketConnect, socketEmit, socketOn } from '@/services/websockets';

const actions = {
  async initStats({ commit, dispatch }) {
    const uid = await dispatch('getUser');

    socketConnect(() => {
      socketEmit('initCounts', uid);
    });

    socketOn('getUserGameCount', (userStats) => {
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
  async getStats({ dispatch }) {
    const uid = await dispatch('getUser');

    socketEmit('getStats', uid);
  },
  clearStats({ commit }) {
    commit('CLEAR_STATS');
  },
  async getLeaderboards({ commit }, params) {
    commit('SET_LEADERBOARDS', []);

    socketEmit('getLeaderboards', params);
  },
};

export default actions;
