const getters = {
  globalStats: (state) => state.globalStats,
  userStats: (state) => state.userStats,
  playerCount: (state) => state.playerCount,
  userGameCount: (state) => state.userGameCount,
  globalGameCount: (state) => state.globalGameCount,
  leaderboards: (state) => state.leaderboards,
  showStats: (state) => state.showStats,
  showLeaderboards: (state) => state.showLeaderboards,
};

export default getters;
