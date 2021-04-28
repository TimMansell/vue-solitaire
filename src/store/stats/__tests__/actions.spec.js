import actions from '../actions';

const { getStatsCount, getGlobalStats, getUserStats, toggleStats } = actions;

const mockStats = { won: 1, lost: 2, competed: 3 };
const rootState = {
  user: {
    luid: 123,
  },
};

const commit = jest.fn();

jest.mock('@/services/db');

describe('Stats Store', () => {
  it('getStatsCount', async () => {
    await getStatsCount({ commit, rootState });

    expect(commit).toHaveBeenCalledWith('SET_GLOBAL_STATS', mockStats);
    expect(commit).toHaveBeenCalledWith('SET_USER_STATS', mockStats);
  });

  it('getGlobalStats', async () => {
    await getGlobalStats({ commit });

    expect(commit).toHaveBeenCalledWith('SET_FULL_STATS', mockStats);
    expect(commit).toHaveBeenCalledWith('SET_GLOBAL_STATS', mockStats);
  });

  it('getUserStats', async () => {
    await getUserStats({ commit, rootState });

    expect(commit).toHaveBeenCalledWith('SET_FULL_STATS', mockStats);
    expect(commit).toHaveBeenCalledWith('SET_USER_STATS', mockStats);
  });

  it('toggleStats', async () => {
    const state = {
      showStats: true,
    };

    await toggleStats({ commit, state });

    expect(commit).toHaveBeenCalledWith('SHOW_STATS', false);
  });
});
