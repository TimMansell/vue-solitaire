import actions from '../actions';

const { getGlobalStatsCount, getGlobalStats, getUserStats, toggleStats } = actions;

const mockStats = { error: false, response: { count: 1 } };
const mockStatsResult = { count: 1 };

const commit = jest.fn();

jest.mock('@/services/db', () => ({
  getGlobalStatsCount: () => mockStats,
  getGlobalStats: () => mockStats,
  getUserStats: () => mockStats,
}));

describe('Stats', () => {
  it('getGlobalStatsCount', async () => {
    await getGlobalStatsCount({ commit });

    expect(commit).toHaveBeenCalledWith('SET_GLOBAL_STATS_COUNT', mockStatsResult);
  });

  it('getGlobalStats', async () => {
    await getGlobalStats({ commit });

    expect(commit).toHaveBeenCalledWith('SET_FULL_STATS', mockStatsResult);
    expect(commit).toHaveBeenCalledWith('SET_GLOBAL_STATS_COUNT', mockStatsResult);
  });

  it('getUserStats', async () => {
    const rootState = {
      user: {
        suid: 123,
      },
    };

    await getUserStats({ commit, rootState });

    expect(commit).toHaveBeenCalledWith('SET_FULL_STATS', mockStatsResult);
  });

  it('toggleStats', async () => {
    const state = {
      showStats: true,
    };

    await toggleStats({ commit, state });

    expect(commit).toHaveBeenCalledWith('SHOW_STATS', false);
  });
});
