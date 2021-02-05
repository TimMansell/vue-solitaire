import solitaire from '@/services/solitaire';
import { getBoardState } from './helpers';

const actions = {
  async init({ dispatch, state }, isNewGame) {
    const { selectedCardId } = state;
    const boardToUse = getBoardState(isNewGame);

    solitaire.init(boardToUse);

    dispatch('setBoard');
    dispatch('setFoundations');
    dispatch('setCard', selectedCardId);
  },
  restart({ commit }) {
    commit('RESTART_GAME');
  },
  checkGameState({ commit, dispatch }) {
    const hasMoves = solitaire.hasMoves();
    const isBoardEmpty = solitaire.isEmptyBoard();

    if (!hasMoves) {
      commit('SET_HAS_MOVES', false);
    }

    dispatch('setGameState', isBoardEmpty);
  },
  setFoundations({ commit }) {
    const foundationCards = solitaire.getFoundationCards();

    commit('SET_FOUNDATIONS', foundationCards);
  },
  setBoard({ commit }) {
    const board = solitaire.getBoardCards();

    commit('SET_BOARD', board);
  },
  setCard({ commit, state, dispatch }, id) {
    const { selectedCard } = state;

    if (selectedCard === id) {
      dispatch('unselectCard');
    } else {
      solitaire.setSelectedCard(id);

      commit('SELECT_CARD', id);
    }
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
    dispatch('trackNewGame');
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
