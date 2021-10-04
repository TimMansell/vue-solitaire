import { onSocket, emitSocket } from '@/services/websockets';
import {
  initBoard,
  initFoundation,
  checkHasMoves,
  isBoardEmpty,
  checkValidCardMove,
  moveCards,
  checkValidFoundationMove,
  moveCardsToFoundation,
  getEmptyFoundationColumn,
  getDraggedCards,
} from '@/services/solitaire';

const actions = {
  initGame({ dispatch, state, rootState }) {
    const { cards } = state;
    const { luid } = rootState.user;

    if (cards.flat().length === 0) {
      emitSocket('newGame', luid);
    }

    onSocket('newGame', (deck) => {
      dispatch('initBoard', deck);
      dispatch('initFoundation');
    });
  },
  restartGame({ commit }) {
    commit('RESTART_GAME');
  },
  checkGameState({ dispatch, state }) {
    const hasMoves = checkHasMoves(state);
    const isEmptyBoard = isBoardEmpty(state);

    if (!hasMoves) {
      dispatch('setGameOutcome', isEmptyBoard);
    }
  },
  initFoundation({ dispatch, state }) {
    const { foundation } = state;
    const foundationCards =
      foundation.flat().length > 0 ? foundation : initFoundation();

    dispatch('setFoundation', foundationCards);
  },
  initBoard({ dispatch }, cards) {
    const board = initBoard(cards);

    dispatch('setGameLoading', true);
    dispatch('setBoard', board);
    dispatch('setGameLoading', false);
  },
  setFoundation({ commit }, foundation) {
    commit('SET_FOUNDATIONS', foundation);
  },
  setBoard({ commit }, board) {
    commit('SET_BOARD', board);
  },
  setCard({ commit }, id) {
    commit('SELECT_CARD', id);
  },
  moveCardsToColumn({ dispatch, state }, selectedColumn) {
    const isValidMove = checkValidCardMove(state, selectedColumn);

    if (isValidMove) {
      const { cards } = moveCards(state, selectedColumn);

      dispatch('saveMove', { selectedColumn, isBoard: true });
      dispatch('setBoard', cards);
      dispatch('checkGameState');
    }

    dispatch('setCard', null);
  },
  moveCardToFoundation({ dispatch, state }, selectedColumn) {
    const isValidMove = checkValidFoundationMove(state, selectedColumn);

    if (isValidMove) {
      const { cards, foundation } = moveCardsToFoundation(
        state,
        selectedColumn
      );

      dispatch('saveMove', { selectedColumn, isFoundation: true });
      dispatch('setFoundation', foundation);
      dispatch('setBoard', cards);
      dispatch('checkGameState');
    }

    dispatch('setCard', null);
  },
  autoMoveCardToFoundation({ dispatch, state }, id) {
    dispatch('setCard', id);

    // Find suit in array to determine column to move to.
    const foundationColumn = getEmptyFoundationColumn(state);

    dispatch('moveCardToFoundation', foundationColumn);
  },
  setDraggedCards({ commit, state }, id) {
    const cards = getDraggedCards(state, id);

    commit('DRAG_CARDS', cards);
  },
  clearDraggedCards({ commit }) {
    commit('CLEAR_DRAG_CARDS');
  },
};

export default actions;
