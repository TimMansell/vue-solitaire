// Return state as function so we can reset it.
const state = () => ({
  globalStats: {},
  userStats: {},
  playerCount: 0,
  userGameCount: 0,
  globalGameCount: 0,
  leaderboards: {},
  showStats: false,
  showLeaderboards: false,
});

export default state;
