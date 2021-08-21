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
  async initGame({ commit, dispatch, state }) {
    const { isNewGame } = state;

    dispatch('setBoard', isNewGame);
    dispatch('setFoundations', isNewGame);

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
  setFoundations({ commit, state }, isNewGame) {
    const { foundation } = state;
    const foundationCards = !isNewGame ? foundation : initFoundation();

    commit('SET_FOUNDATIONS', foundationCards);
  },
  setBoard({ commit, state }, isNewGame) {
    const { cards } = state;
    const board = !isNewGame ? cards : initBoard();

    commit('SET_BOARD', board);
  },
  setCard({ commit }, id) {
    commit('SELECT_CARD', id);
  },
  moveCardsToColumn({ commit, dispatch, state }, selectedColumn) {
    const isValidMove = checkValidCardMove(state, selectedColumn);

    if (isValidMove) {
      const { cards } = moveCards(state, selectedColumn);

      commit('SET_BOARD', cards);

      dispatch('incrementMoves');
      dispatch('checkGameState');
    }

    dispatch('setCard', null);
  },
  moveCardToFoundation({ commit, dispatch, state }, selectedColumn) {
    const isValidMove = checkValidFoundationMove(state, selectedColumn);

    if (isValidMove) {
      const { cards, foundation } = moveCardsToFoundation(
        state,
        selectedColumn
      );

      commit('SET_FOUNDATIONS', foundation);
      commit('SET_BOARD', cards);

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
  setBoardAndFoundation({ commit }, { cards, foundation }) {
    commit('SET_FOUNDATIONS', foundation);
    commit('SET_BOARD', cards);
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
