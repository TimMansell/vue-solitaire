import {
  shuffleCards,
  getFoundations,
  setBoard,
  checkValidCardMove,
  moveCards,
  checkValidFoundationMove,
} from '@/services/solitaire';

const actions = {
  initGame({ commit }) {
    const shuffledCards = shuffleCards();
    const board = setBoard(shuffledCards);
    commit('setBoard', board);

    const foundationColumns = getFoundations();
    commit('setFoundations', foundationColumns);
  },
  restartGame({ commit }) {
    commit('restartGame');
  },
  selectCard({ commit, state }, id) {
    const { selectedCard } = state;

    if (selectedCard === id) {
      commit('unSelectCard');
    } else {
      commit('selectCard', id);
    }
  },
  setColumn({ commit }, columnNo) {
    commit('setColumn', columnNo);
  },
  moveCardsToColumn({ commit, state }) {
    const { selectedCardId, selectedColumn, board } = state;
    const cardsToMove = moveCards(selectedCardId, selectedColumn, board.cards, board.cards);

    const isValidMove = checkValidCardMove(selectedCardId, selectedColumn, board.cards);

    if (isValidMove) {
      commit('moveCardsToColumn', cardsToMove);
    } else {
      commit('invalidMove');
    }
  },
  setFoundationColumn({ commit }, columnNo) {
    commit('setColumn', columnNo);
  },
  moveCardToFoundation({ commit, state }) {
    const { selectedCardId, selectedColumn, board } = state;
    const cardsToMove = moveCards(selectedCardId, selectedColumn, board.cards, board.foundation);

    const isValidMove = checkValidFoundationMove(selectedCardId, selectedColumn, board);

    if (isValidMove) {
      commit('moveCardToFoundation', cardsToMove);
    } else {
      commit('invalidMove');
    }
  },
  dealTestCards({ commit }, deck) {
    const board = setBoard(deck);
    commit('setBoard', board);

    const foundationColumns = getFoundations();
    commit('setFoundations', foundationColumns);
  },
  setTestBoard({ commit }, deck) {
    commit('setBoard', deck);

    const foundationColumns = getFoundations();
    commit('setFoundations', foundationColumns);
  },
};

export default actions;
