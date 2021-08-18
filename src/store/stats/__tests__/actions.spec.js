import actions from '../actions';

const { getStatsCount, getStats, getLeaderboards } = actions;

const mockUid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

const mockStats = { won: 1, lost: 2, competed: 3 };
const mockLeaderboardsMoves = [
  {
    rank: 1,
    date: '29-04-2021',
    player: 'Player 1',
    moves: 2,
  },
  {
    rank: 2,
    date: '29-04-2021',
    player: 'Player 2',
    moves: 2,
  },
];

const rootState = {
  user: {
    luid: mockUid,
  },
};

const commit = jest.fn();

jest.mock('@/services/db');

describe('Stats Store', () => {
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
