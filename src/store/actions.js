import Solitaire from '@/services/solitaire';

const SolitaireService = new Solitaire();

const actions = {
  initGame({ dispatch }) {
    dispatch('setBoard');
    dispatch('setFoundations');
  },
  setFoundations({ commit }) {
    const foundationColumns = SolitaireService.getFoundations();

    commit('SET_FOUNDATIONS', foundationColumns);
  },
  setBoard({ commit }) {
    SolitaireService.shuffleCards();
    SolitaireService.setDeck();
    SolitaireService.setBoard();

    const board = SolitaireService.getBoard();

    commit('SET_BOARD', board);
  },
  restartGame({ commit }) {
    commit('RESTART_GAME');
  },
  selectCard({ commit, state, dispatch }, id) {
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
  moveCardsToColumn({ commit, state, dispatch }, selectedColumn) {
    const { board } = state;

    SolitaireService.setMoveCards(selectedColumn, board.cards, board.cards);

    const isValidMove = SolitaireService.isValidCardMove(selectedColumn, board.cards);

    if (isValidMove) {
      const cardsToMove = SolitaireService.getMovedCards();

      commit('MOVE_CARDS_TO_COLUMN', cardsToMove);
      commit('REMOVE_CARDS_FROM_COLUMN', cardsToMove);
    }

    dispatch('unselectCard');
  },
  moveCardToFoundation({ commit, state, dispatch }, selectedColumn) {
    const { board } = state;

    SolitaireService.setMoveCards(selectedColumn, board.cards, board.foundation);

    const isValidMove = SolitaireService.isValidFoundationMove(selectedColumn, board);

    if (isValidMove) {
      const cardsToMove = SolitaireService.getMovedCards();

      commit('MOVE_CARD_TO_FOUNDATION', cardsToMove);
      commit('REMOVE_CARDS_FROM_COLUMN', cardsToMove);
    }

    dispatch('unselectCard');
  },
  dealTestCards({ commit, dispatch }, deck) {
    SolitaireService.setDeck(deck);
    SolitaireService.setBoard();

    const board = SolitaireService.getBoard();

    commit('SET_BOARD', board);

    dispatch('setFoundations');
  },
  setTestBoard({ commit, dispatch }, board) {
    SolitaireService.setDeck(board);
    SolitaireService.setBoard();
    // SolitaireService.setBoard(board);
    commit('SET_BOARD', board);

    dispatch('setFoundations');
  },
};

export default actions;
