import Vue from 'vue';
import defaultState from './state';

const mutations = {
  restartGame(state) {
    Object.assign(state, defaultState);
  },
  shuffleCards(state, cards) {
    state.shuffledCards = cards;
  },
  setBoard(state, deck) {
    const { foundationColumns } = state.rules;

    deck.forEach((cards, index) => {
      Vue.set(state.board.cards, index, deck[index]);
    });

    foundationColumns.forEach((foundation, index) => {
      Vue.set(state.board.foundation, index, []);
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
  moveCardToFoundation(state, { toMove, column, removeCardsFromColumn }) {
    Vue.set(state.board.cards, toMove.position[0], removeCardsFromColumn);
    state.board.foundation[column].push(toMove);

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
