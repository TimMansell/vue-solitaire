// Return state as function so we can reset it.
const state = (currentState) => ({
  game: {
    moves: [],
    times: [],
    hash: '',
  },
  gameOutcome: {
    hasGameWon: false,
    hasGameLost: false,
  },
  isGamePaused: false,
  isOverlayVisible: true,
  versionMatch: true,
  connection: {
    isConnecting: currentState?.connection.isConnecting ?? true,
    isOnline: currentState?.connection.isOnline ?? true,
  },
});

export default state;
