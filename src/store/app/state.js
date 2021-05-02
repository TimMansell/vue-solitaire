import { version } from '../../../package.json';

// Return state as function so we can reset it.
const state = () => ({
  isGameWon: false,
  isGameLost: false,
  isGamePaused: {
    isPaused: false,
    isActive: false,
  },
  isTimerPaused: false,
  game: {
    moves: 0,
    time: 0,
  },
  showRules: false,
  showNewGame: false,
  version,
});

export default state;
