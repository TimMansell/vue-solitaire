import { gql } from 'apollo-boost';
import solitaire from '@/services/solitaire';
import apollo from '../apolloClient';

const actions = {
  initGame({ dispatch }) {
    solitaire.init();

    dispatch('setBoard');
    dispatch('setFoundations');
    dispatch('apolloNewGame');
  },
  restartGame({ commit }) {
    commit('RESTART_GAME');
  },
  async apolloNewGame({ commit, dispatch }) {
    const response = await apollo.mutate({
      mutation: gql`
        mutation {
          createGame {
            id
          }
        }
      `,
    });

    dispatch('apolloTotalGames');

    commit('SET_GAME_ID', response.data.createGame.id);
  },
  async apolloTotalGames({ commit }) {
    const response = await apollo.query({
      query: gql`
        query {
          totalGames {
            count
          }
        }
      `,
      fetchPolicy: 'network-only',
    });

    commit('SET_TOTAL_GAMES', response.data.totalGames.count);
  },
  checkGameWon({ commit }) {
    const isGameWon = solitaire.isEmptyBoard();

    commit('SET_GAME_WON', isGameWon);
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
    const hasMoves = solitaire.hasMoves();

    commit('SET_REMAINING_MOVES', hasMoves);
  },
  moveCardsToColumn({ dispatch }, selectedColumn) {
    const isValidMove = solitaire.isValidCardMove(selectedColumn);

    if (isValidMove) {
      solitaire.moveCards(selectedColumn);

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
