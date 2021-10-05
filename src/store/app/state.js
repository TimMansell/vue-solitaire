// Return state as function so we can reset it.
const state = () => ({
  game: {
    moves: [],
    time: 0,
  },
  gameOutcome: {
    hasGameWon: false,
    hasGameLost: false,
  },
  isGameLoading: true,
  isGamePaused: false,
  isOverlayVisible: true,
  versionMatch: true,
  hasConnection: false,
});

export default state;
