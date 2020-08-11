import getters from '../getters';

const state = {
  uid: 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7',
};

describe('User', () => {
  it('uid', () => {
    const { uid } = getters;
    const result = uid(state);

    expect(result).toEqual(state.uid);
  });
});
