const mutations = {
  SET_GLOBAL_STATS(state, stats) {
    state.globalStats = stats;
  },
  SET_USER_STATS(state, stats) {
    state.userStats = stats;
  },
  SET_USER_GAME_COUNT(state, { completed }) {
    state.userGameCount = completed;
  },
  SET_GLOBAL_GAME_COUNT(state, { completed }) {
    state.globalGameCount = completed;
  },
  SET_GLOBAL_PLAYER_COUNT(state, { players }) {
    state.playerCount = players;
  },
  CLEAR_STATS(state) {
    state.userStats = {};
    state.globalStats = {};
  },
  SHOW_STATS(state, showStats) {
    state.showStats = showStats;
  },
};

export default mutations;
