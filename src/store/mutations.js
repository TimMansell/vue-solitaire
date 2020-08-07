import Vue from 'vue';
import defaultState from './state';

const mutations = {
  RESTART_GAME(state) {
    const { stats } = state;
    const newState = {
      ...defaultState(),
      stats,
    };

    Object.assign(state, newState);
  },
  SET_GAME_WON(state, isGameWon) {
    state.isGameWon = isGameWon;
  },
  SET_GAME_LOST(state, isGameLost) {
    state.isGameLost = isGameLost;
  },
  SET_BOARD(state, deck) {
    deck.forEach((cards, index) => {
      Vue.set(state.board.cards, index, cards);
    });
  },
  SET_FOUNDATIONS(state, foundationColumns) {
    foundationColumns.forEach((foundation, index) => {
      Vue.set(state.board.foundation, index, foundation);
    });
  },
  SELECT_CARD(state, id) {
    state.selectedCardId = id;
  },
  UNSELECT_CARD(state) {
    state.selectedCardId = null;
  },
  SET_TOTAL_GAMES(state, totalGames) {
    state.stats.totalGames = totalGames;
  },
  SET_GAME(state, game) {
    state.game = {
      ...state.game,
      ...game,
    };
  },
  INCREMENT_MOVES(state) {
    state.game.moves += 1;
    console.log({ state });
  },
};

export default mutations;
