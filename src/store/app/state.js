// Return state as function so we can reset it.
const state = () => ({
  isGameWon: false,
  isGameLost: false,
  isGamePaused: {
    isPaused: false,
    isActive: false,
  },
  isTimerPaused: false,
  game: {
    id: null,
    moves: 0,
    time: 0,
  },
  isNewGame: true,
  showRules: false,
  showNewGame: false,
});

export default state;
