import {
  checkUserExists,
  getUserStats,
  getStatsCount,
  getGlobalStats,
} from '../queries';

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

  describe('getUserStats', () => {
    it('should return valid object for getUserStats', async () => {
      const { response } = await getUserStats(mockUid);
      const { userStats } = response;

      expect(userStats).toEqual(stats);
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

  describe('getGlobalStats', () => {
    it('should return valid object for getGlobalStats', async () => {
      const { response } = await getGlobalStats();
      const { globalStats } = response;

      expect(globalStats).toEqual(stats);
    });
  });
});
