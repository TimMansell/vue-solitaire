// Return state as function so we can reset it.
const state = () => ({
  isGameWon: false,
  isGameLost: false,
  isGamePaused: {
    isPaused: false,
    isActive: false,
  },
  isTimerPaused: false,
  isOverlayVisible: true,
  game: {
    moves: 0,
    time: 0,
  },
  showRules: false,
  showNewGame: false,
  showHistory: false,
  versionMatch: true,
});

export default state;
