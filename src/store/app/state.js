import { getVersion } from '@/services/version';

// Return state as function so we can reset it.
const state = () => ({
  isGamePaused: false,
  isOldVersion: false,
  hasGameUpdated: false,
  version: getVersion(),
});

export default state;
