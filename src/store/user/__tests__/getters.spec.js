import getters from '../getters';

const { luid } = getters;

const state = {
  luid: 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7',
};

describe('User Store', () => {
  it('luid', () => {
    const result = luid(state);

    expect(result).toEqual(state.luid);
  });
});
