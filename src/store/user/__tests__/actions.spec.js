import actions from '../actions';

const { initUser, setUserStats } = actions;

const mockLuid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';
const mockSuid = 123;
const mockStats = { gameNumber: 1 };

const commit = jest.fn();

jest.mock('@/services/user', () => ({
  getLocalUser: () => mockLuid,
  getServerUser: () => mockSuid,
  getUserStats: () => mockStats,
  setUserStats: () => jest.fn(),
}));

describe('User', () => {
  it('initUser', async () => {
    await initUser({ commit });

    expect(commit).toHaveBeenCalledWith('SET_USER_GAME_STATS', mockStats);
    expect(commit).toHaveBeenCalledWith('SET_USER_ID', mockLuid);
    expect(commit).toHaveBeenCalledWith('SET_USER_SID', mockSuid);
  });

  it('setUserStats', () => {
    setUserStats({ commit }, mockStats);

    expect(commit).toHaveBeenCalledWith('SET_USER_GAME_STATS', mockStats);
  });
});
