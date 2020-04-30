import Solitaire from '@/services/solitaire';

const SolitaireService = new Solitaire();

const actions = {
  initGame({ dispatch }) {
    dispatch('setBoard');
    dispatch('setFoundations');
  },
  restartGame({ commit, dispatch }) {
    SolitaireService.init();

    dispatch('unselectCard');

    commit('RESTART_GAME');
  },
  checkGameWon({ commit }) {
    const isGameWon = SolitaireService.isEmptyBoard();

    commit('SET_GAME_WON', isGameWon);
  },
  setGameWon({ commit }, isGameWon) {
    commit('SET_GAME_WON', isGameWon);
  },
  setGameLost({ commit }, isGameLost) {
    commit('SET_GAME_LOST', isGameLost);
  },
  setFoundations({ commit }) {
    const foundationCards = SolitaireService.getFoundationCards();

    commit('SET_FOUNDATIONS', foundationCards);
  },
  setBoard({ commit }) {
    const board = SolitaireService.getBoardCards();

    commit('SET_BOARD', board);
  },
  setCard({ commit, state, dispatch }, id) {
    const { selectedCard } = state;

    if (selectedCard === id) {
      dispatch('unselectCard');
    } else {
      SolitaireService.setSelectedCard(id);

      commit('SELECT_CARD', id);
    }
  },
  unselectCard({ commit }) {
    SolitaireService.removeSelectedCard();

    commit('UNSELECT_CARD');
  },
  checkRemainingMoves({ commit }) {
    const isGameLost = SolitaireService.hasNoMoves();

    commit('SET_GAME_LOST', isGameLost);
  },
  moveCardsToColumn({ dispatch }, selectedColumn) {
    const isValidMove = SolitaireService.isValidCardMove(selectedColumn);

    if (isValidMove) {
      SolitaireService.setMoveCards(selectedColumn);

      dispatch('setBoard');
      dispatch('checkRemainingMoves');
    }

    dispatch('unselectCard');
  },
  moveCardToFoundation({ dispatch }, selectedColumn) {
    const isValidMove = SolitaireService.isValidFoundationMove(selectedColumn);

    if (isValidMove) {
      SolitaireService.moveCardsToFoundation(selectedColumn);

      dispatch('setBoard');
      dispatch('setFoundations');
      dispatch('checkGameWon');
      dispatch('checkRemainingMoves');
    }

    dispatch('unselectCard');
  },
  autoMoveCardToFoundation({ dispatch }, id) {
    SolitaireService.setSelectedCard(id);

    // Find suit in array to determine column to move to.
    const foundationColumn = SolitaireService.findEmptyFoundationColumn(id);

    dispatch('moveCardToFoundation', foundationColumn);
  },
  setBoardAndFoundation({ dispatch }, board) {
    SolitaireService.setBoard(board);
    SolitaireService.setFoundation(board);

    dispatch('setBoard');
    dispatch('setFoundations');
  },
};

export default actions;
