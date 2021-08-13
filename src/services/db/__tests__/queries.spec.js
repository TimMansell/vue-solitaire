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
    date: '2021-05-20T23:34:49.564Z',
    won: false,
    lost: false,
    moves: 0,
    time: 12,
  },
];

const mockLeaderboardsMoves = [
  {
    rank: 1,
    date: '2021-04-29T12:25:47.907Z',
    uid: '7dac9d78-353f-409b-8a7f-2192409c44a2',
    moves: 2,
  },
  {
    rank: 2,
    date: '2021-04-29T12:26:20.825Z',
    uid: '2cbf658a-3102-4e9d-b749-bac853efed0d',
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
        user: { exists },
      } = response;

      expect(exists).toEqual(true);
    });

    it('should not return an existing user', async () => {
      const { response } = await getUser('123');
      const {
        user: { exists },
      } = response;

      expect(exists).toEqual(false);
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
