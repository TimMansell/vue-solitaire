import solitaire from '@/services/solitaire';

const actions = {
  initGame({ dispatch }) {
    solitaire.init();

    dispatch('setBoard');
    dispatch('setFoundations');
  },
  restartGame({ commit, dispatch }) {
    solitaire.init();

    dispatch('unselectCard');

    commit('RESTART_GAME');
  },
  checkGameWon({ commit }) {
    const isGameWon = solitaire.isEmptyBoard();

    commit('SET_GAME_WON', isGameWon);
  },
  setGameWon({ commit }, isGameWon) {
    commit('SET_GAME_WON', isGameWon);
  },
  setGameLost({ commit }, isGameLost) {
    commit('SET_GAME_LOST', isGameLost);
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
  checkRemainingMoves({ commit }) {
    const isGameLost = solitaire.hasNoMoves();

    commit('SET_GAME_LOST', isGameLost);
  },
  moveCardsToColumn({ dispatch }, selectedColumn) {
    const isValidMove = solitaire.isValidCardMove(selectedColumn);

    if (isValidMove) {
      solitaire.setMoveCards(selectedColumn);

      dispatch('setBoard');
      dispatch('checkRemainingMoves');
    }

    dispatch('unselectCard');
  },
  moveCardToFoundation({ dispatch }, selectedColumn) {
    const isValidMove = solitaire.isValidFoundationMove(selectedColumn);

    if (isValidMove) {
      solitaire.moveCardsToFoundation(selectedColumn);

      dispatch('setBoard');
      dispatch('setFoundations');
      dispatch('checkGameWon');
      dispatch('checkRemainingMoves');
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
    solitaire.setBoard(board);
    solitaire.setFoundation(board);

    dispatch('setBoard');
    dispatch('setFoundations');
  },
};

export default actions;
