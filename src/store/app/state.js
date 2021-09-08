// Return state as function so we can reset it.
const state = () => ({
  isGameLoading: true,
  isGameWon: false,
  isGameLost: false,
  isGamePaused: {
    isPaused: false,
    isActive: false,
  },
  isTimerPaused: true,
  isOverlayVisible: true,
  game: {
    moves: [],
    time: 0,
  },
  showRules: false,
  showNewGame: false,
  showHistory: false,
  versionMatch: true,
});

export default state;
