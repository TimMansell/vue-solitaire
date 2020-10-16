import getters from '../getters';

const { globalStats } = getters;

const state = {
  globalStats: {
    count: 1,
  },
};

describe('Stats', () => {
  it('globalStats', () => {
    const result = globalStats(state);

    expect(result).toEqual(state.globalStats);
  });
});
