import { version } from '../../../package.json';

// Return state as function so we can reset it.
const state = () => ({
  isGamePaused: false,
  isOverlayVisible: true,
  isOldVersion: false,
  hasGameUpdated: false,
  version,
});

export default state;
