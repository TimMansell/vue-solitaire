import {
  mockUid,
  mockHistory,
  mockLeaderboardsMoves,
  mockStats,
  mockVersionNumber,
} from '@/mockData';
import {
  getInitialData,
  getStats,
  getUsersGames,
  getLeaderboards,
} from '../queries';

jest.mock('../apollo');

describe('DB service queries', () => {
  describe('getInitialData', () => {
    it('should return an existing user', async () => {
      const {
        user: { exists, name },
      } = await getInitialData(mockUid, mockVersionNumber);

      expect(exists).toBe(true);
      expect(name).toBe('Player Name');
    });

    it('should not return an existing user', async () => {
      const {
        user: { exists, name },
      } = await getInitialData('123', mockVersionNumber);

      expect(exists).toBe(false);
      expect(name).toBe('New Player Name');
    });

    it('should return valid object for getStatsCount', async () => {
      const { globalStats, userStats, version } = await getInitialData(
        mockUid,
        mockVersionNumber
      );

      expect(userStats).toEqual(mockStats);
      expect(globalStats).toEqual(mockStats);
      expect(version.matches).toEqual(true);
    });
  });

  describe('getStats', () => {
    it('should return valid object for getStats', async () => {
      const { globalStats, userStats } = await getStats();

      expect(userStats).toEqual(mockStats);
      expect(globalStats).toEqual(mockStats);
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
