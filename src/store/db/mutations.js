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
  },
};

export default mutations;
