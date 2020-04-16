const state = {
  cards: {
    values: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
    suits: ['c', 's', 'h', 'd'],
  },
  shuffledCards: [],
  board: {
    cards: [],
    foundation: [],
  },
  rules: {
    columns: [7, 7, 7, 7, 6, 6, 6, 6],
    foundationColumns: [1, 1, 1, 1],
  },
  selectedCards: [],
};

export default state;
