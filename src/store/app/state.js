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
  isGamePaused: false,
  isOverlayVisible: true,
  versionMatch: true,
  connection: {
    isOnline: JSON.parse(localStorage.getItem('isOnline')) ?? false,
  },
});

export default state;
