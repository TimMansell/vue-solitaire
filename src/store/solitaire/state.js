// Return state as function so we can reset it.
const state = () => ({
  board: {
    cards: [[], [], [], [], [], [], [], []],
    foundation: [[], [], [], []],
  },
  selectedCardId: null,
  hasMoves: true,
  draggedCards: [],
  isNewGame: true,
});

export default state;
