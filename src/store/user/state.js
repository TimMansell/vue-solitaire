// Return state as function so we can reset it.
const state = () => ({
  luid: null,
  name: 'test',
  isUserSavedOnServer: false,
  hasUserPlayedAGame: false,
  gameHistory: [],
});

export default state;
