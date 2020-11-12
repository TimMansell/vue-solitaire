// Return state as function so we can reset it.
const state = () => ({
  globalStats: {
    count: 0,
  },
  fullStats: {
    count: 0,
    won: 0,
    lost: 0,
    played: 0,
    completed: 0,
  },
  showStats: false,
});

export default state;
