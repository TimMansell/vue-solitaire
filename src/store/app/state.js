// Return state as function so we can reset it.
const state = () => ({
  isGameLoading: true,
  hasGameWon: false,
  hasGameLost: false,
  isGamePaused: false,
  isOverlayVisible: true,
  game: {
    moves: [],
    time: 0,
  },
  versionMatch: true,
});

export default state;
