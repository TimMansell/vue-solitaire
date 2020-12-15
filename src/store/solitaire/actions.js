import solitaire from '@/services/solitaire';
import db from '@/services/db';

import { getBoardState } from './helpers';

const actions = {
  async initGame({ commit, dispatch, state }) {
    const { isNewGame, selectedCardId } = state;
    const boardToUse = getBoardState(isNewGame);

    solitaire.init(boardToUse);

    dispatch('setBoard');
    dispatch('setFoundations');

    if (isNewGame) {
      await dispatch('trackNewGame');
    } else {
      dispatch('setCard', selectedCardId);
    }

    dispatch('getStatsCount');

    commit('NEW_GAME', false);
  },
  restartGame({ commit, state }, completed) {
    const { game } = state;

    if (!completed) {
      db.gameCompleted(game);
    }

    commit('RESTART_GAME');
    commit('NEW_GAME', true);
  },
  async trackNewGame({ commit, rootState }) {
    const { suid } = rootState.user;
    const { error, response } = await db.gameNew(suid);

    if (!error) {
      const {
        newGame: { _id: id },
      } = response;

      commit('SET_GAME', { id });
    }
  },
  checkGameState({ commit, state }) {
    const hasMoves = solitaire.hasMoves();
    const isBoardEmpty = solitaire.isEmptyBoard();
    const { game } = state;

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
  setGamePaused({ commit }, options) {
    const isGamePaused = {
      isPaused: true,
      isActive: false,
      showMsg: false,
      ...options,
    };

    commit('SET_GAME_PAUSED', isGamePaused);
  },
  setGameResumed({ commit }) {
    const isGamePaused = {
      isPaused: false,
      isActive: false,
      showMsg: false,
    };

    commit('SET_GAME_PAUSED', isGamePaused);
  },
  toggleGamePaused({ commit, state }) {
    const { isPaused, isActive, showMsg } = state.isGamePaused;

    const isGamePaused = {
      isPaused: !isPaused,
      isActive: !isActive,
      showMsg: !showMsg,
    };

    commit('SET_GAME_PAUSED', isGamePaused);
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
  },
  autoMoveCardToFoundation({ dispatch }, id) {
    solitaire.setSelectedCard(id);

    // Find suit in array to determine column to move to.
    const foundationColumn = solitaire.findEmptyFoundationColumn(id);

    dispatch('moveCardToFoundation', foundationColumn);
  },
  setBoardAndFoundation({ dispatch }, board) {
    solitaire.init(board);

    dispatch('setBoard');
    dispatch('setFoundations');
    dispatch('trackNewGame');
  },
  updateTimer({ commit }) {
    commit('UPDATE_GAME_TIME');
  },
  toggleRules({ commit, state }) {
    const showRules = !state.showRules;

    commit('SHOW_RULES', showRules);
  },
  toggleNewGame({ commit, state }) {
    const showNewGame = !state.showNewGame;

    commit('SHOW_NEW_GAME', showNewGame);
  },
};

export default actions;
