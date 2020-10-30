import actions from '../actions';

const { initGlobalStats, getUserStats, toggleStats } = actions;

const mockStats = { error: false, response: { count: 1 } };
const mockStatsResult = { count: 1 };

const commit = jest.fn();

jest.mock('@/services/db', () => ({
  getGlobalStats: () => mockStats,
  getUserStats: () => mockStats,
}));

describe('Stats', () => {
  it('initGlobalStats', async () => {
    await initGlobalStats({ commit });

    expect(commit).toHaveBeenCalledWith('SET_GLOBAL_STATS', mockStatsResult);
  });

  it('getUserStats', async () => {
    const rootState = {
      user: {
        suid: 123,
      },
    };

    await getUserStats({ commit, rootState });

    expect(commit).toHaveBeenCalledWith('SET_USER_STATS', mockStatsResult);
  });

  it('toggleStats', async () => {
    const state = {
      showStats: true,
    };

    await toggleStats({ commit, state });

    expect(commit).toHaveBeenCalledWith('SHOW_STATS', false);
  });
});
