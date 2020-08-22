import solitaire from '@/services/solitaire';
import db from '@/services/db';

const actions = {
  async initGame({ dispatch }) {
    const isGameSaved = solitaire.checkGameState();

    solitaire.init();

    dispatch('setBoard');
    dispatch('setFoundations');

    if (!isGameSaved) {
      await dispatch('newGame');
      dispatch('saveGame');
    } else {
      await dispatch('loadGame');
    }
  },
  restartGame({ commit, state }, completed) {
    const { game } = state;

    if (!completed) {
      db.gameCompleted(game);
    }

    solitaire.removeGameState();

    commit('RESTART_GAME');
  },
  async newGame({ commit, dispatch, rootState }) {
    const { suid } = rootState.user;
    const { error, response } = await db.newGame(suid);

    if (!error) {
      const { _id, gameNumber } = response;

      dispatch('setUserStats', { gameNumber });
      commit('SET_GAME', { id: _id });
    }
  },
  loadGame({ commit }) {
    const gameState = solitaire.loadGameState();

    commit('LOAD_GAME', gameState);
  },
  saveGame({ state }) {
    solitaire.saveGameState(state);
  },
  checkGameState({ commit, state }) {
    const hasMoves = solitaire.hasMoves();
    const isBoardEmpty = solitaire.isEmptyBoard();
    const { game } = state;

    // solitaire.saveGameState(state);

    if (!hasMoves) {
      commit('SET_HAS_MOVES', false);
      commit('SET_GAME_WON', isBoardEmpty);
      commit('SET_GAME_LOST', !isBoardEmpty);

      if (isBoardEmpty) {
        db.gameWon(game);
      } else {
        db.gameLost(game);
      }
    }
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
  moveCardsToColumn({ commit, dispatch }, selectedColumn) {
    const isValidMove = solitaire.isValidCardMove(selectedColumn);

    if (isValidMove) {
      solitaire.moveCards(selectedColumn);

      commit('INCREMENT_MOVES');

      dispatch('setBoard');
      dispatch('checkGameState');
    }

    dispatch('unselectCard');
    dispatch('saveGame');
  },
  moveCardToFoundation({ commit, dispatch }, selectedColumn) {
    const isValidMove = solitaire.isValidFoundationMove(selectedColumn);

    if (isValidMove) {
      solitaire.moveCardsToFoundation(selectedColumn);

      commit('INCREMENT_MOVES');

      dispatch('setBoard');
      dispatch('setFoundations');
      dispatch('checkGameState');
    }

    dispatch('unselectCard');
    dispatch('saveGame');
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
    dispatch('newGame');
  },
};

export default actions;
