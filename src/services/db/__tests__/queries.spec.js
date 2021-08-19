import {
  mockUid,
  mockHistory,
  mockLeaderboardsMoves,
  mockStats,
} from '@/mockData';
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

      expect(userStats).toEqual(mockStats);
      expect(globalStats).toEqual(mockStats);
    });
  });

  describe('getStatsCount', () => {
    it('should return valid object for getStatsCount', async () => {
      const { response } = await getStatsCount(mockUid);
      const { userStats, globalStats } = response;

      expect(userStats).toEqual(mockStats);
      expect(globalStats).toEqual(mockStats);
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
