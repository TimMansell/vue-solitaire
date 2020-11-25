import actions from '../actions';

const {
  getGlobalStatsCount,
  getGlobalStats,
  getUserStatsCount,
  getUserStats,
  toggleStats,
} = actions;

const mockStats = { error: false, response: { count: 1 } };
const mockStatsResult = { count: 1 };
const rootState = {
  user: {
    suid: 123,
  },
};

const commit = jest.fn();

jest.mock('@/services/db', () => ({
  getGlobalStatsCount: () => mockStats,
  getGlobalStats: () => mockStats,
  getUserStats: () => mockStats,
  getUserStatsCount: () => mockStats,
}));

describe('Stats', () => {
  it('getGlobalStatsCount', async () => {
    await getGlobalStatsCount({ commit });

    expect(commit).toHaveBeenCalledWith('SET_GLOBAL_STATS', mockStatsResult);
  });

  it('getGlobalStats', async () => {
    await getGlobalStats({ commit });

    expect(commit).toHaveBeenCalledWith('SET_FULL_STATS', mockStatsResult);
    expect(commit).toHaveBeenCalledWith('SET_GLOBAL_STATS', mockStatsResult);
  });

  it('getUserStatsCount', async () => {
    await getUserStatsCount({ commit, rootState });

    expect(commit).toHaveBeenCalledWith('SET_USER_STATS', mockStatsResult);
  });

  it('getUserStats', async () => {
    await getUserStats({ commit, rootState });

    expect(commit).toHaveBeenCalledWith('SET_FULL_STATS', mockStatsResult);
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
