// Return state as function so we can reset it.
const state = () => ({
  game: {
    moves: [],
    times: [],
  },
  gameOutcome: {
    hasGameWon: false,
    hasGameLost: false,
  },
  isGameLoading: true,
  isGamePaused: false,
  isOverlayVisible: true,
  versionMatch: true,
});

export default state;
