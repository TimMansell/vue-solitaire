const state = {
  cards: {
    values: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
    suits: ['c', 's', 'h', 'd'],
  },
  shuffledCards: [],
  board: {
    cards: [],
    aces: {
      c: [],
      h: [],
      d: [],
      s: [],
    },
  },
  rules: {
    columns: [7, 7, 7, 7, 6, 6, 6, 6],
  },
  selectedCards: [],
};

export default state;
