import getters from '../getters';

const { luid, suid, stats } = getters;

const state = {
  luid: 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7',
  suid: 123,
  stats: {
    totalGames: 1,
  },
};

describe('User', () => {
  it('luid', () => {
    const result = luid(state);

    expect(result).toEqual(state.luid);
  });

  it('suid', () => {
    const result = suid(state);

    expect(result).toEqual(state.suid);
  });

  it('stats', () => {
    const result = stats(state);

    expect(result).toEqual(state.stats);
  });
});
