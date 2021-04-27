import solitaire from '@/services/solitaire';
import { getBoardState } from './helpers';

const actions = {
  async initGame({ commit, dispatch, state }) {
    const { selectedCardId, isNewGame } = state;
    const boardToUse = getBoardState(isNewGame);

    solitaire.init(boardToUse);

    dispatch('setBoard');
    dispatch('setFoundations');

    if (selectedCardId) {
      dispatch('setCard', selectedCardId);
    }

    if (isNewGame) {
      commit('NEW_GAME', false);
    }
  },
  restartGame({ commit }) {
    commit('RESTART_GAME');
  },
  checkGameState({ commit, dispatch }) {
    const hasMoves = solitaire.hasMoves();
    const isBoardEmpty = solitaire.isEmptyBoard();

    if (!hasMoves) {
      commit('SET_HAS_MOVES', false);

      dispatch('setGameState', isBoardEmpty);
    }
  },
  setFoundations({ commit }) {
    const foundationCards = solitaire.getFoundationCards();

    commit('SET_FOUNDATIONS', foundationCards);
  },
  setBoard({ commit }) {
    const board = solitaire.getBoardCards();

    commit('SET_BOARD', board);
  },
  setCard({ state, dispatch }, id) {
    const { selectedCard } = state;

    if (selectedCard === id) {
      dispatch('unselectCard');
    } else {
      dispatch('selectCard', id);
    }
  },
  selectCard({ commit }, id) {
    solitaire.setSelectedCard(id);

    commit('SELECT_CARD', id);
  },
  unselectCard({ commit }) {
    solitaire.removeSelectedCard();

    commit('UNSELECT_CARD');
  },
  moveCardsToColumn({ dispatch }, selectedColumn) {
    const isValidMove = solitaire.isValidCardMove(selectedColumn);

    if (isValidMove) {
      solitaire.moveCards(selectedColumn);

      dispatch('incrementMoves');
      dispatch('setBoard');
      dispatch('checkGameState');
    }

    dispatch('unselectCard');
  },
  moveCardToFoundation({ dispatch }, selectedColumn) {
    const isValidMove = solitaire.isValidFoundationMove(selectedColumn);

    if (isValidMove) {
      solitaire.moveCardsToFoundation(selectedColumn);

      dispatch('incrementMoves');
      dispatch('setBoard');
      dispatch('setFoundations');
      dispatch('checkGameState');
    }

    dispatch('unselectCard');
  },
  autoMoveCardToFoundation({ dispatch }, id) {
    solitaire.setSelectedCard(id);

    // Find suit in array to determine column to move to.
    const foundationColumn = solitaire.findEmptyFoundationColumn(id);

    dispatch('moveCardToFoundation', foundationColumn);
  },
  setBoardAndFoundation({ dispatch }, board) {
    solitaire.init(board);

    dispatch('setBoard');
    dispatch('setFoundations');
  },
  setDraggedCards({ commit }, id) {
    const cards = solitaire.getDraggedCards(id);

    commit('DRAG_CARDS', cards);
  },
  clearDraggedCards({ commit }) {
    commit('CLEAR_DRAG_CARDS');
  },
};

export default actions;
