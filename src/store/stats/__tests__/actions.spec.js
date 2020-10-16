import actions from '../actions';

const { initGlobalStats } = actions;

const mockStats = { error: false, response: { count: 1 } };
const mockStatsResult = { count: 1 };

const commit = jest.fn();

jest.mock('@/services/db', () => ({
  getGlobalStats: () => mockStats,
}));

describe('Stats', () => {
  it('initGlobalStats', async () => {
    await initGlobalStats({ commit });

    expect(commit).toHaveBeenCalledWith('SET_GLOBAL_STATS', mockStatsResult);
  });
});
