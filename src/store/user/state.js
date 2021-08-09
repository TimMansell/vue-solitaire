// Return state as function so we can reset it.
const state = () => ({
  luid: '',
  name: '',
  existsOnServer: false,
  hasPlayedAGame: false,
  gameHistory: [],
});

export default state;
