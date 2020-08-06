// Return state as function so we can reset it.
const state = () => ({
  board: {
    cards: [],
    foundation: [],
  },
  selectedCardId: null,
  isGameWon: false,
  isGameLost: false,
  stats: {
    totalGames: null,
  },
  game: {
    id: null,
    start: null,
    stop: null,
  },
});

export default state;
