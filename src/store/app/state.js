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
  isGameLoading: false,
  isGamePaused: false,
  isOverlayVisible: true,
  versionMatch: true,
  hasConnection: JSON.parse(localStorage.getItem('hasConnection')) ?? false,
});

export default state;
