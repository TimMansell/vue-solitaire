import { version } from '../../../package.json';

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
  isOldVersion: false,
  hasGameUpdated: false,
  connection: {
    isConnecting: true,
    isOnline: true,
  },
  version,
});

export default state;
