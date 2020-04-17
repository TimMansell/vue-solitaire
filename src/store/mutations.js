import Vue from 'vue';
import defaultState from './state';

const mutations = {
  restartGame(state) {
    Object.assign(state, defaultState);
  },
  setBoard(state, deck) {
    deck.forEach((cards, index) => {
      Vue.set(state.board.cards, index, deck[index]);
    });
  },
  setFoundations(state, foundationColumns) {
    foundationColumns.forEach((foundation, index) => {
      Vue.set(state.board.foundation, index, []);
    });
  },
  setDeck(state, deck) {
    state.shuffledCards = deck;
  },
  // selectCard(state, card) {
  //   state.selectedCards.push(card);
  // },
  selectCard(state, id) {
    state.selectedCardId = id;
  },
  unSelectCard(state) {
    state.selectedCardId = null;
  },
  setColumn(state, columnNo) {
    state.selectedColumn = columnNo;
  },
  moveCards(state, { colsToMove, removeCardsFromColumn, moveCardsToColumn }) {
    Vue.set(state.board.cards, colsToMove.from, removeCardsFromColumn);
    Vue.set(state.board.cards, colsToMove.to, moveCardsToColumn);

    state.selectedCards = [];
  },
  moveCardsToColumn(state, { cardFromColumn, cardsToColumn }) {
    Vue.set(state.board.cards, cardFromColumn.column, cardFromColumn.cards);
    Vue.set(state.board.cards, cardsToColumn.column, cardsToColumn.cards);

    state.selectedCardId = null;
  },
  invalidMove(state) {
    state.selectedCards = [];
  },
  revealHiddenCard(state, cards) {
    cards.forEach((card, index) => {
      Vue.set(state.board.cards, index, cards[index]);
    });
  },
  moveCardToFoundation(state, { cardFromColumn, cardsToColumn }) {
    Vue.set(state.board.cards, cardFromColumn.column, cardFromColumn.cards);
    // state.board.foundation[column].push(toMove);
    Vue.set(state.board.foundation, cardsToColumn.column, cardsToColumn.cards);


    state.selectedCardId = null;
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
