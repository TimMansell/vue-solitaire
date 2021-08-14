import { history, exists } from '../user';
import {
  wrapClient,
  createMockFind,
  createMockFiltered,
  createMockCount,
} from '../__mocks__/mockDb';

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
  describe('exists', () => {
    it('should return exists = true', async () => {
      const mockContext = wrapClient(
        createMockFind({
          ...createMockCount(1),
        })
      );

      const result = await exists({ uid: mockUid }, '', mockContext);

      expect(result).toEqual(1);
    });

    it('should return exists = false', async () => {
      const mockContext = wrapClient(
        createMockFind({
          ...createMockCount(0),
        })
      );

      const result = await exists({ uid: mockUid }, '', mockContext);

      expect(result).toEqual(0);
    });
  });

  describe('history', () => {
    it('should return users game history', async () => {
      const mockContext = wrapClient(
        createMockFind({
          ...createMockFiltered(mockHistory),
        })
      );

      const result = await history({ uid: mockUid }, '', mockContext);

      expect(result).toEqual(mockHistory);
    });
  });
});
