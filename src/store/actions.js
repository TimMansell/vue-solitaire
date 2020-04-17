import {
  shuffleCards,
  getFoundations,
  setBoard,
  checkValidCardMove,
  moveCards,
  checkValidFoundationMove,
} from '@/services/solitaire';

const actions = {
  initGame({ dispatch }) {
    dispatch('setBoard');
    dispatch('setFoundations');
  },
  setFoundations({ commit }) {
    const foundationColumns = getFoundations();

    commit('SET_FOUNDATIONS', foundationColumns);
  },
  setBoard({ commit }) {
    const shuffledCards = shuffleCards();
    const board = setBoard(shuffledCards);

    commit('SET_BOARD', board);
  },
  restartGame({ commit }) {
    commit('RESTART_GAME');
  },
  selectCard({ commit, state }, id) {
    const { selectedCard } = state;

    if (selectedCard === id) {
      commit('UNSELECT_CARD');
    } else {
      commit('SELECT_CARD', id);
    }
  },
  setColumn({ commit }, columnNo) {
    commit('SET_COLUMN', columnNo);
  },
  moveCardsToColumn({ commit, state }) {
    const { selectedCardId, selectedColumn, board } = state;
    const cardsToMove = moveCards(selectedCardId, selectedColumn, board.cards, board.cards);

    const isValidMove = checkValidCardMove(selectedCardId, selectedColumn, board.cards);

    if (isValidMove) {
      commit('MOVE_CARDS_TO_COLUMN', cardsToMove);
      commit('REMOVE_CARDS_FROM_COLUMN', cardsToMove);
    }

    commit('UNSELECT_CARD');
  },
  moveCardToFoundation({ commit, state }) {
    const { selectedCardId, selectedColumn, board } = state;
    const cardsToMove = moveCards(selectedCardId, selectedColumn, board.cards, board.foundation);

    const isValidMove = checkValidFoundationMove(selectedCardId, selectedColumn, board);

    if (isValidMove) {
      commit('MOVE_CARD_TO_FOUNDATION', cardsToMove);
      commit('REMOVE_CARDS_FROM_COLUMN', cardsToMove);
    }

    commit('UNSELECT_CARD');
  },
  dealTestCards({ commit, dispatch }, deck) {
    const board = setBoard(deck);
    commit('SET_BOARD', board);

    dispatch('setFoundations');
  },
  setTestBoard({ commit, dispatch }, deck) {
    commit('SET_BOARD', deck);

    dispatch('setFoundations');
  },
};

export default actions;
