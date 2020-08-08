// Return state as function so we can reset it.
const state = () => ({
  stats: {
    totalGames: null,
  },
  game: {
    id: null,
    start: null,
    stop: null,
    moves: 0,
  },
});

export default state;
