// Return state as function so we can reset it.
const state = () => ({
  globalStats: {
    completed: 0,
    players: 0,
  },
  userStats: {
    completed: 0,
  },
  fullStats: {
    won: 0,
    lost: 0,
    played: 0,
    completed: 0,
  },
  showStats: false,
});

export default state;
