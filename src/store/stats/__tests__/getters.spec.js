import getters from '../getters';

const { globalStats, userStats, fullStats, showStats } = getters;

const state = {
  globalStats: {
    count: 1,
  },
  userStats: {
    count: 1,
  },
  fullStats: {
    count: 4,
    won: 1,
    lost: 1,
    completed: 2,
  },
  showStats: true,
};

describe('Stats Store', () => {
  it('globalStats', () => {
    const result = globalStats(state);

    expect(result).toEqual(state.globalStats);
  });

  it('userStats', () => {
    const result = userStats(state);

    expect(result).toEqual(state.userStats);
  });

  it('fullStats', () => {
    const result = fullStats(state);

    expect(result).toEqual(state.fullStats);
  });

  it('showStats', () => {
    const result = showStats(state);

    expect(result).toEqual(state.showStats);
  });
});
