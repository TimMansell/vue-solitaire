// Return state as function so we can reset it.
const state = () => ({
  luid: null,
  isUserSavedOnServer: false,
  hasUserPlayedAGame: false,
  games: [],
});

export default state;
