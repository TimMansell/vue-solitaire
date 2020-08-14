import actions from '../actions';

const mockLuid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

jest.mock('@/services/user', () => ({
  getLocalUser: () => mockLuid,
}));

describe('User', () => {
  it('initLocalUser', () => {
    const { initLocalUser } = actions;
    const commit = jest.fn();

    initLocalUser({ commit });

    expect(commit).toHaveBeenCalledWith('SET_USER_ID', mockLuid);
  });
});
