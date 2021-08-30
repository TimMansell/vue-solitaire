import { mockUid, mockLeaderboardsMoves, mockStats } from '@/mockData';
import actions from '../actions';

const { getStatsCount, getStats, getLeaderboards } = actions;

const rootState = {
  user: {
    luid: mockUid,
  },
};

jest.mock('@/services/db');

describe('Stats Store', () => {
  let commit;

  beforeEach(() => {
    commit = jest.fn();
  });

  it('getStatsCount', async () => {
    await getStatsCount({ commit, rootState });

    expect(commit).toHaveBeenCalledWith('SET_USER_GAME_COUNT', mockStats);
    expect(commit).toHaveBeenCalledWith('SET_GLOBAL_GAME_COUNT', mockStats);
    expect(commit).toHaveBeenCalledWith('SET_GLOBAL_PLAYER_COUNT', mockStats);
  });

  it('getStats', async () => {
    await getStats({ commit, rootState });

    expect(commit).toHaveBeenCalledWith('SET_USER_STATS', mockStats);
    expect(commit).toHaveBeenCalledWith('SET_GLOBAL_STATS', mockStats);
    expect(commit).toHaveBeenCalledWith('SET_GLOBAL_GAME_COUNT', mockStats);
  });

  it('getLeaderboards', async () => {
    await getLeaderboards({ commit }, {});

    expect(commit).toHaveBeenCalledWith(
      'SET_LEADERBOARDS',
      mockLeaderboardsMoves
    );
  });
});
