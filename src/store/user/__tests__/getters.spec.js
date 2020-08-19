import getters from '../getters';

const state = {
  luid: 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7',
};

describe('User', () => {
  it('luid', () => {
    const { luid } = getters;
    const result = luid(state);

    expect(result).toEqual(state.luid);
  });
});
