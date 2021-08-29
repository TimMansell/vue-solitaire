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
import { newGame } from '@/services/db';

const actions = {
  initGame({ commit, dispatch, state }) {
    const { isNewGame } = state;

    dispatch('initBoard', isNewGame);
    dispatch('initFoundation', isNewGame);

    commit('NEW_GAME', false);
  },
  restartGame({ commit }) {
    commit('RESTART_GAME');
  },
  checkGameState({ commit, dispatch, state }) {
    const hasMoves = checkHasMoves(state);

    commit('SET_HAS_MOVES', hasMoves);

    if (!hasMoves) {
      const isEmptyBoard = isBoardEmpty(state);

      dispatch('setGameState', isEmptyBoard);
    }
  },
  initFoundation({ dispatch, state }, isNewGame) {
    const { foundation } = state;
    const foundationCards = !isNewGame ? foundation : initFoundation();

    dispatch('setFoundation', foundationCards);
  },
  async initBoard({ dispatch, state, rootState }, isNewGame) {
    dispatch('setGameLoading', true);

    if (isNewGame) {
      const { luid } = rootState.user;
      const { cards } = await newGame(luid);
      const board = initBoard(cards);

      dispatch('setBoard', board);
    } else {
      const { cards } = state;

      dispatch('setBoard', cards);
    }

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

      dispatch('setBoard', cards);
      dispatch('incrementMoves');
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

      dispatch('setFoundation', foundation);
      dispatch('setBoard', cards);
      dispatch('incrementMoves');
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
