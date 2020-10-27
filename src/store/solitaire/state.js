// Return state as function so we can reset it.
const state = () => ({
  board: {
    cards: [],
    foundation: [],
  },
  selectedCardId: null,
  isGameWon: false,
  isGameLost: false,
  isGamePaused: {
    paused: false,
    active: false,
  },
  hasMoves: true,
  game: {
    id: null,
    moves: 0,
    time: 0,
  },
  isNewGame: true,
});

export default state;
