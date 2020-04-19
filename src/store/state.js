// Return state as function so we can reset it.
const state = () => ({
  board: {
    cards: [],
    foundation: [],
  },
  selectedCardId: null,
  selectedColumn: null,
  config: {
    autoRevealCards: false,
  },
});

export default state;
