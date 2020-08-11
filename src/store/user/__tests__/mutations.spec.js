import mutations from '../mutations';

describe('User', () => {
  it('SET_USER', () => {
    const { SET_USER } = mutations;
    const uid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';
    const state = { uid };

    SET_USER(state, uid);

    expect(state.uid).toEqual(uid);
  });
});
