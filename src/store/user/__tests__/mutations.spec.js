import mutations from '../mutations';

const { SET_USER_ID } = mutations;

describe('User Store', () => {
  it('SET_USER_ID', () => {
    const luid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';
    const state = { luid };

    SET_USER_ID(state, luid);

    expect(state.luid).toEqual(luid);
  });
});
