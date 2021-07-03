import {
  checkUserExists,
  getStats,
  getStatsCount,
  getAppVersion,
} from '../queries';

import { version as appVersion } from '../../../../package.json';

jest.mock('../apollo');

const mockUid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

const stats = {
  won: 1,
  lost: 2,
  completed: 3,
};

describe('DB service queries', () => {
  describe('checkUserExists', () => {
    it('should return an existing user', async () => {
      const { response } = await checkUserExists(mockUid);
      const { findUser } = response;

      expect(findUser).toEqual({ exists: true });
    });

    it('should not return an existing user', async () => {
      const { response } = await checkUserExists('123');
      const { findUser } = response;

      expect(findUser).toEqual({ exists: false });
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
});
