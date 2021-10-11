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
  hasConnection: false,
  hasOfflineMove: false,
  isOfflineGame: false,
  // connection: {
  //   isOnline: false,
  //   hasOfflineMove: false,
  // },
});

export default state;
