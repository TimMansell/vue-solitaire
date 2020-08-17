import actions from '../actions';

const mockLuid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';
const mockSuid = 123;

jest.mock('@/services/user', () => ({
  getLocalUser: () => mockLuid,
  getServerUser: () => mockSuid,
}));

describe('User', () => {
  it('initUser', async () => {
    const { initUser } = actions;
    const commit = jest.fn();
    const state = {};

    await initUser({ commit, state });

    expect(commit).toHaveBeenCalledWith('SET_USER_ID', mockLuid);
    expect(commit).toHaveBeenCalledWith('SET_USER_SID', mockSuid);
  });
});
