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
  checkGameState({ dispatch, state }) {
    const hasMoves = checkHasMoves(state);
    const isEmptyBoard = isBoardEmpty(state);

    if (!hasMoves) {
      dispatch('setGameOutcome', isEmptyBoard);
    }
  },
  initFoundation({ dispatch, state }, isNewGame) {
    const { foundation } = state;
    const foundationCards = !isNewGame ? foundation : initFoundation();

    dispatch('setFoundation', foundationCards);
  },
  async initBoard({ dispatch, state, rootState }, isNewGame) {
    if (isNewGame) {
      dispatch('setGameLoading', true);

      const { luid } = rootState.user;
      const { date, cards } = await newGame(luid);
      const board = initBoard(cards);

      dispatch('setGameStartTime', date);
      dispatch('setBoard', board);
      dispatch('setGameLoading', false);
    } else {
      const { cards } = state;

      dispatch('setBoard', cards);
    }
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
    const { selectedCardId } = state;
    const isValidMove = checkValidCardMove(state, selectedColumn);

    if (isValidMove) {
      const { cards } = moveCards(state, selectedColumn);

      dispatch('saveMove', {
        selectedCardId,
        selectedColumn,
        isMove: true,
        isBoard: true,
      });
      dispatch('setBoard', cards);
      dispatch('checkGameState');
    }

    dispatch('setCard', null);
  },
  moveCardToFoundation({ dispatch, state }, selectedColumn) {
    const { selectedCardId } = state;
    const isValidMove = checkValidFoundationMove(state, selectedColumn);

    if (isValidMove) {
      const { cards, foundation } = moveCardsToFoundation(
        state,
        selectedColumn
      );

      dispatch('saveMove', {
        selectedCardId,
        selectedColumn,
        isMove: true,
        isFoundation: true,
      });
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
