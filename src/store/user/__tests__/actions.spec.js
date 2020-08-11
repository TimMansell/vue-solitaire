import actions from '../actions';

describe('User', () => {
  it('initUser', () => {
    const { initUser } = actions;
    const commit = jest.fn();
    const uid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

    localStorage.setItem('uid', uid);

    initUser({ commit });

    expect(commit).toHaveBeenCalledWith('SET_USER', uid);
  });
});
