const getters = {
  globalStats: ({ globalStats }) => globalStats,
  userStats: ({ userStats }) => userStats,
  playerCount: ({ playerCount }) => playerCount,
  onlinePlayerCount: ({ onlinePlayerCount }) => onlinePlayerCount,
  userGameCount: ({ userGameCount }) => userGameCount,
  globalGameCount: ({ globalGameCount }) => globalGameCount,
  leaderboards: ({ leaderboards }) => leaderboards,
};

export default getters;
