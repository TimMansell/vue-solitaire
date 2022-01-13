import { version } from '../../../package.json';

// Return state as function so we can reset it.
const state = (currentState) => ({
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
  isLatestVersion: true,
  hasGameUpdated: false,
  connection: {
    isConnecting: currentState?.connection.isConnecting ?? true,
    isOnline: currentState?.connection.isOnline ?? true,
  },
  version,
});

export default state;
