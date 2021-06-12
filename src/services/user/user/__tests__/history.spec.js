import { getUsersGames } from '../history';

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
