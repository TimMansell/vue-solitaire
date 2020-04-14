import Vue from 'vue';

const mutations = {
  shuffleCards(state, cards) {
    state.shuffledCards = cards;
  },
  setBoard(state, deck) {
    deck.forEach((cards, index) => {
      Vue.set(state.board.cards, index, deck[index]);
    });
  },
  setDeck(state, deck) {
    state.shuffledCards = deck;
  },
  selectCard(state, card) {
    state.selectedCards.push(card);
  },
  moveCards(state, { colsToMove, removeCardsFromColumn, moveCardsToColumn }) {
    Vue.set(state.board.cards, colsToMove.from, removeCardsFromColumn);
    Vue.set(state.board.cards, colsToMove.to, moveCardsToColumn);

    state.selectedCards = [];
  },
  invalidMove(state) {
    state.selectedCards = [];
  },
  revealHiddenCard(state, cards) {
    cards.forEach((card, index) => {
      Vue.set(state.board.cards, index, cards[index]);
    });
  },
  moveCardToFoundation(state, { toMove, removeCardsFromColumn }) {
    Vue.set(state.board.cards, toMove.position[0], removeCardsFromColumn);
    state.board.aces[toMove.suit].push(toMove);

    state.selectedCards = [];
  },
  moveKingToColumn(state, {
    toMove,
    column,
    moveCardsToColumn,
    removeCardsFromColumn,
  }) {
    Vue.set(state.board.cards, column, moveCardsToColumn);
    Vue.set(state.board.cards, toMove.position[0], removeCardsFromColumn);

    state.selectedCards = [];
  },
};

export default mutations;
