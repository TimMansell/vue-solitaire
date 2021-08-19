import { mockUid, mockHistory } from '@/mockData';
import { getUsersGames } from '../index';

jest.mock('@/services/db');

describe('User', () => {
  describe('getUsersGames', () => {
    it('should get users games', async () => {
      const params = { offset: 0, limit: 25 };

      const games = await getUsersGames(mockUid, params);

      expect(games).toEqual(mockHistory);
    });
  });
});
