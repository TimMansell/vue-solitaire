// Return state as function so we can reset it.
const state = () => ({
  board: {
    cards: [[], [], [], [], [], [], [], []],
    foundation: [[], [], [], []],
  },
  selectedCardId: null,
  // isGameWon: false,
  // isGameLost: false,
  // isGamePaused: {
  //   isPaused: false,
  //   isActive: false,
  // },
  // isTimerPaused: false,
  // hasMoves: true,
  // game: {
  //   id: null,
  //   moves: 0,
  //   time: 0,
  // },
  // isNewGame: true,
  // showRules: false,
  // showNewGame: false,
  draggedCards: [],
});

export default state;
