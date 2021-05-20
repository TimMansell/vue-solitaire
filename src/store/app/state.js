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
    moves: 0,
    time: 0,
  },
  showRules: false,
  showNewGame: false,
  showHistory: false,
  versionMatch: true,
  showTableHelper: true,
});

export default state;
