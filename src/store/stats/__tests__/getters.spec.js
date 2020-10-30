import getters from '../getters';

const { globalStats, fullUserStats, showStats } = getters;

const state = {
  globalStats: {
    count: 1,
  },
  fullUserStats: {
    count: 4,
    won: 1,
    lost: 1,
    completed: 2,
  },
  showStats: true,
};

describe('Stats', () => {
  it('globalStats', () => {
    const result = globalStats(state);

    expect(result).toEqual(state.globalStats);
  });

  it('fullUserStats', () => {
    const result = fullUserStats(state);

    expect(result).toEqual(state.fullUserStats);
  });

  it('showStats', () => {
    const result = showStats(state);

    expect(result).toEqual(state.showStats);
  });
});
