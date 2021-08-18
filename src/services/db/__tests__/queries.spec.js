import {
  getUser,
  getStats,
  getStatsCount,
  getAppVersion,
  getUsersGames,
  getLeaderboards,
} from '../queries';

import { version as appVersion } from '../../../../package.json';

jest.mock('../apollo');

const mockUid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

const mockHistory = [
  {
    date: '20-05-2021',
    time: '23:34:49',
    duration: '0:00:12',
    moves: 1,
    number: '4',
    outcome: 'Gave Up',
  },
  {
    date: '19-05-2021',
    time: '23:34:49',
    duration: '0:00:12',
    moves: 2,
    number: '3',
    outcome: 'Won',
  },
  {
    date: '19-05-2021',
    time: '23:34:49',
    duration: '0:00:12',
    moves: 2,
    number: '2',
    outcome: 'Lost',
  },
  {
    date: '19-05-2021',
    time: '23:34:49',
    duration: '0:00:12',
    moves: 2,
    number: '1',
    outcome: 'Won',
  },
];

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

const stats = {
  won: 1,
  lost: 2,
  completed: 3,
};

describe('DB service queries', () => {
  describe('getUser', () => {
    it('should return an existing user', async () => {
      const { response } = await getUser(mockUid);
      const {
        user: { exists, name },
      } = response;

      expect(exists).toBe(true);
      expect(name).toBe('Player Name');
    });

    it('should not return an existing user', async () => {
      const { response } = await getUser('123');
      const {
        user: { exists, name },
      } = response;

      expect(exists).toBe(false);
      expect(name).toBe('New Player Name');
    });
  });

  describe('getStats', () => {
    it('should return valid object for getStats', async () => {
      const { response } = await getStats();
      const { globalStats, userStats } = response;

      expect(userStats).toEqual(stats);
      expect(globalStats).toEqual(stats);
    });
  });

  describe('getStatsCount', () => {
    it('should return valid object for getStatsCount', async () => {
      const { response } = await getStatsCount(mockUid);
      const { userStats, globalStats } = response;

      expect(userStats).toEqual(stats);
      expect(globalStats).toEqual(stats);
    });
  });

  describe('getAppVersion', () => {
    it('should return valid object for getAppVersion', async () => {
      const { response } = await getAppVersion();
      const { version } = response;

      expect(version).toEqual({ number: appVersion });
    });
  });

  describe('getUsersGames', () => {
    it('should return valid object for getUsersGames', async () => {
      const { response } = await getUsersGames(mockUid, {
        offset: 0,
        limit: 2,
      });
      const {
        user: { history },
      } = response;

      expect(history).toEqual(mockHistory);
    });
  });

  describe('getLeaderboards', () => {
    it('should return valid object for getLeaderboards', async () => {
      const { response } = await getLeaderboards({
        limit: 2,
        showBest: 'moves',
      });
      const { leaderboards } = response;

      expect(leaderboards).toEqual(mockLeaderboardsMoves);
    });
  });
});
