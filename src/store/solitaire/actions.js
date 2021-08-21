import solitaire from '@/services/solitaire';
// import { getBoardState } from './helpers';

const actions = {
  async initGame({ dispatch, state }) {
    const { selectedCardId, isNewGame } = state;

    dispatch('setBoard', isNewGame);
    dispatch('setFoundations', isNewGame);

    if (selectedCardId) {
      dispatch('setCard', selectedCardId);
    }

    if (isNewGame) {
      dispatch('newGame', false);
    }
  },
  newGame({ commit }, isNewGame) {
    commit('NEW_GAME', isNewGame);
  },
  restartGame({ commit }) {
    commit('RESTART_GAME');
  },
  checkGameState({ commit, dispatch, state }) {
    const hasMoves = solitaire.hasMoves(state);
    const isBoardEmpty = solitaire.isEmptyBoard(state);

    if (!hasMoves) {
      commit('SET_HAS_MOVES', false);

      dispatch('setGameState', isBoardEmpty);
    }
  },
  setFoundations({ commit, state }, isNewGame) {
    const { foundation } = state;
    const foundationCards = !isNewGame
      ? foundation
      : solitaire.initFoundation();

    commit('SET_FOUNDATIONS', foundationCards);
  },
  setBoard({ commit, state }, isNewGame) {
    const { cards } = state;
    const board = !isNewGame ? cards : solitaire.initBoard();

    commit('SET_BOARD', board);
  },
  setCard({ state, dispatch }, id) {
    const { selectedCardId } = state;

    if (selectedCardId === id) {
      dispatch('selectCard', null);
    } else {
      dispatch('selectCard', id);
    }
  },
  selectCard({ commit }, id) {
    commit('SELECT_CARD', id);
  },
  moveCardsToColumn({ commit, dispatch, state }, selectedColumn) {
    const isValidMove = solitaire.isValidCardMove(state, selectedColumn);

    if (isValidMove) {
      const { cards } = solitaire.moveCards(state, selectedColumn);

      commit('SET_BOARD', cards);

      dispatch('incrementMoves');
      dispatch('checkGameState');
    }

    dispatch('selectCard', null);
  },
  moveCardToFoundation({ commit, dispatch, state }, selectedColumn) {
    const isValidMove = solitaire.isValidFoundationMove(state, selectedColumn);

    if (isValidMove) {
      const { foundation, cards } = solitaire.moveCardsToFoundation(
        state,
        selectedColumn
      );

      commit('SET_FOUNDATIONS', foundation);
      commit('SET_BOARD', cards);

      dispatch('incrementMoves');
      dispatch('checkGameState');
    }

    // dispatch('unselectCard');
    dispatch('selectCard', null);
  },
  autoMoveCardToFoundation({ dispatch, state }, id) {
    // Find suit in array to determine column to move to.
    const foundationColumn = solitaire.findEmptyFoundationColumn(state, id);

    dispatch('moveCardToFoundation', foundationColumn);
  },
  setBoardAndFoundation({ dispatch }, board) {
    solitaire.init(board);

    dispatch('setBoard');
    dispatch('setFoundations');
  },
  setDraggedCards({ commit, state }, id) {
    const cards = solitaire.getDraggedCards(state, id);

    commit('DRAG_CARDS', cards);
  },
  clearDraggedCards({ commit }) {
    commit('CLEAR_DRAG_CARDS');
  },
};

export default actions;
