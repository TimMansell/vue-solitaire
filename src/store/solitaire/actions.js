import { differenceInSeconds } from 'date-fns';
import solitaire from '@/services/solitaire';
import graphql from '@/services/graphql';

const actions = {
  initGame({ dispatch }) {
    solitaire.init();

    dispatch('setBoard');
    dispatch('setFoundations');
    dispatch('apolloNewGame');
  },
  restartGame({ commit, dispatch }, hasQuit) {
    if (hasQuit) {
      dispatch('apolloQuitGame');
    }

    commit('RESTART_GAME');
  },
  checkGameState({ commit, dispatch }) {
    const hasMoves = solitaire.hasMoves();
    const isBoardEmpty = solitaire.isEmptyBoard();

    if (!hasMoves) {
      commit('SET_HAS_MOVES', false);

      if (isBoardEmpty) {
        commit('SET_GAME_WON', true);

        dispatch('apolloWonGame');
      }

      if (!isBoardEmpty) {
        commit('SET_GAME_LOST', true);

        dispatch('apolloLostGame');
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
    solitaire.setBoard(board);
    solitaire.setFoundation(board);

    dispatch('setBoard');
    dispatch('setFoundations');
  },
  async apolloNewGame({ commit }) {
    const { error, response } = await graphql.newGame();

    if (!error) {
      const { id, gameNumber } = response;

      commit('SET_GAME', {
        id,
        start: new Date(),
      });

      commit('SET_TOTAL_GAMES', gameNumber);
    }
  },
  apolloLostGame({ state }) {
    const { id, start, moves } = state.game;
    const time = differenceInSeconds(new Date(), start);

    graphql.updateGame(id, { lost: true, time, moves, completed: true });
  },
  apolloWonGame({ state }) {
    const { id, start, moves } = state.game;
    const time = differenceInSeconds(new Date(), start);

    graphql.updateGame(id, { won: true, time, moves, completed: true });
  },
  apolloQuitGame({ state }) {
    const { id, start, moves } = state.game;
    const time = differenceInSeconds(new Date(), start);

    graphql.updateGame(id, { time, moves });
  },
};

export default actions;
