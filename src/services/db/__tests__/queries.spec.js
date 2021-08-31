import {
  mockUid,
  mockHistory,
  mockLeaderboardsMoves,
  mockStats,
  mockVersionNumber,
} from '@/mockData';
import {
  getUser,
  getStats,
  getStatsCount,
  checkAppVersion,
  getUsersGames,
  getLeaderboards,
} from '../queries';

jest.mock('../apollo');

describe('DB service queries', () => {
  describe('getUser', () => {
    it('should return an existing user', async () => {
      const { exists, name } = await getUser(mockUid);

      expect(exists).toBe(true);
      expect(name).toBe('Player Name');
    });

    it('should not return an existing user', async () => {
      const { exists, name } = await getUser('123');

      expect(exists).toBe(false);
      expect(name).toBe('New Player Name');
    });
  });

  describe('getStats', () => {
    it('should return valid object for getStats', async () => {
      const { globalStats, userStats } = await getStats();

      expect(userStats).toEqual(mockStats);
      expect(globalStats).toEqual(mockStats);
    });
  });

  describe('getStatsCount', () => {
    it('should return valid object for getStatsCount', async () => {
      const { globalStats, userStats } = await getStatsCount(mockUid);

      expect(userStats).toEqual(mockStats);
      expect(globalStats).toEqual(mockStats);
    });
  });

  describe('checkAppVersion', () => {
    it('should return valid object for checkAppVersion', async () => {
      const { matches } = await checkAppVersion(mockVersionNumber);

      expect(matches).toEqual(true);
    });
  });

  describe('getUsersGames', () => {
    it('should return valid object for getUsersGames', async () => {
      const { history } = await getUsersGames(mockUid, {
        offset: 0,
        limit: 2,
      });

      expect(history).toEqual(mockHistory);
    });
  });

  describe('getLeaderboards', () => {
    it('should return valid object for getLeaderboards', async () => {
      const leaderboards = await getLeaderboards({
        limit: 2,
        showBest: 'moves',
      });

      expect(leaderboards).toEqual(mockLeaderboardsMoves);
    });
  });
});
