import tzMock from 'timezone-mock';
import { mockUid, mockHistoryApi, mockPlayerName } from '@/mockData';
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
          ...createMockFiltered(mockHistoryApi),
        })
      );

      const result = await history({ uid: mockUid }, '', mockContext);

      expect(result).toEqual(mockHistoryApi);
    });
  });

  describe('name', () => {
    it('should return users name', async () => {
      const mockContext = wrapClient({
        ...createMockFindOne({ name: mockPlayerName }),
      });

      const result = await name({ uid: mockUid }, '', mockContext);

      expect(result).toBe(mockPlayerName);
    });
  });
});
