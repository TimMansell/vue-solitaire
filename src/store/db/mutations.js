import defaultState from './state';

const mutations = {
  RESTART_GAME(state) {
    const { stats, userStats } = state;
    const newState = {
      ...defaultState(),
      stats,
      userStats,
    };

    Object.assign(state, newState);
  },
  SET_TOTAL_GAMES(state, totalGames) {
    state.stats.totalGames = totalGames;
  },
  SET_USER_GAMES(state, totalGames) {
    state.userStats.totalGames = totalGames;
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
