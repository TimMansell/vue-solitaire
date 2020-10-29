// Return state as function so we can reset it.
const state = () => ({
  globalStats: {},
  fullUserStats: {
    won: 0,
    lost: 0,
    played: 0,
    abandoned: 0,
  },
  showStats: false,
});

export default state;
