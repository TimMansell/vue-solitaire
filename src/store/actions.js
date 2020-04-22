import Solitaire from '@/services/solitaire';

const SolitaireService = new Solitaire();

const actions = {
  initGame({ dispatch }) {
    dispatch('setBoard');
    dispatch('setFoundations');
  },
  restartGame({ commit }) {
    SolitaireService.init();

    commit('RESTART_GAME');
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
  moveCardsToColumn({ dispatch }, selectedColumn) {
    const isValidMove = SolitaireService.isValidCardMove(selectedColumn);

    if (isValidMove) {
      SolitaireService.setMoveCards(selectedColumn);

      dispatch('setBoard');
    }

    dispatch('unselectCard');
  },
  moveCardToFoundation({ dispatch }, selectedColumn) {
    const isValidMove = SolitaireService.isValidFoundationMove(selectedColumn);

    if (isValidMove) {
      SolitaireService.moveCardsToFoundation(selectedColumn);

      dispatch('setBoard');
      dispatch('setFoundations');
    }

    dispatch('unselectCard');
  },
  dealTestCards({ dispatch }, deck) {
    SolitaireService.setDeck(deck);
    SolitaireService.setBoard();

    dispatch('setBoard');
    dispatch('setFoundations');
  },
  setTestBoard({ dispatch }, board) {
    SolitaireService.setTestBoard(board);

    dispatch('setBoard');
    dispatch('setFoundations');
  },
};

export default actions;
