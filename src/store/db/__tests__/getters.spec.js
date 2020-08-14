import getters from '../getters';

const state = {
  userStats: {
    totalGames: 1,
  },
  game: {
    id: 1,
    start: null,
    stop: null,
    moves: 0,
  },
};

const { userStats, game } = getters;

describe('DB store', () => {
  it('userStats', () => {
    const result = userStats(state);

    expect(result).toEqual(state.userStats);
  });

  it('game', () => {
    const result = game(state);

    expect(result).toEqual(state.game);
  });
});
