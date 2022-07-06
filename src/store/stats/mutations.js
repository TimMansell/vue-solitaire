const mutations = {
  SET_GLOBAL_STATS(state, stats) {
    state.globalStats = stats;
  },
  SET_USER_STATS(state, stats) {
    state.userStats = stats;
  },
  SET_USER_GAME_COUNT(state, games) {
    state.userGameCount = games;
  },
  SET_GLOBAL_GAME_COUNT(state, games) {
    state.globalGameCount = games;
  },
  SET_GLOBAL_PLAYER_COUNT(state, players) {
    state.playerCount = players;
  },
  SET_ONLINE_PLAYER_COUNT(state, players) {
    state.onlinePlayerCount = players;
  },
  SET_LEADERBOARDS(state, leaderboards) {
    state.leaderboards = leaderboards;
  },
};

export default mutations;
