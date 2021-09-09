import tzMock from 'timezone-mock';
import {
  mockUid,
  mockHistoryApi,
  mockHistory,
  mockPlayerName,
} from '@/mockData';
import { history, exists, name } from '../user';
import {
  wrapClient,
  createMockFind,
  createMockFiltered,
  createMockCount,
  createMockFindOne,
} from '../__mocks__/mockDb';

tzMock.register('UTC');

describe('Graphql User Resolvers', () => {
  describe('exists', () => {
    it('should return exists = true', async () => {
      const mockContext = wrapClient(createMockFindOne(mockPlayerName));

      const result = await exists({ uid: mockUid }, '', mockContext);

      expect(result).toEqual(true);
    });

    it('should return exists = false', async () => {
      const mockContext = wrapClient(createMockFindOne(null));

      const result = await exists({ uid: mockUid }, '', mockContext);

      expect(result).toEqual(false);
    });
  });

  describe('history', () => {
    it('should return users game history', async () => {
      const mockContext = wrapClient(
        createMockFind({
          ...createMockFiltered(mockHistoryApi),
          ...createMockCount(mockHistoryApi.length),
        })
      );

      const result = await history(
        { uid: mockUid },
        { offset: 0 },
        mockContext
      );

      expect(result).toEqual(mockHistory);
    });
  });

  describe('name', () => {
    it('should return users name', async () => {
      const mockContext = wrapClient({
        ...createMockFindOne({ name: mockPlayerName }),
        ...createMockCount(0),
      });

      const result = await name({ uid: mockUid }, '', mockContext);

      expect(result).toBe(mockPlayerName);
    });
  });
});
