import { history } from '../user';
import { createMockFind } from './mockDb';

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

describe('Graphql User Resolvers', () => {
  describe('history', () => {
    it('should return users game history', async () => {
      const mockClient = createMockFind(mockHistory);

      const mockContext = {
        ...mockClient,
      };

      const result = await history({ uid: mockUid }, '', mockContext);

      expect(result).toEqual(mockHistory);
    });
  });
});
