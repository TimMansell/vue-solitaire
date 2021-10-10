import tzMock from 'timezone-mock';
import { mockUid, mockHistoryApi, mockHistory } from '@/mockData';
import { history } from '../user';
import {
  wrapClient,
  createMockFind,
  createMockFiltered,
  createMockCount,
} from '../__mocks__/mockDb';

tzMock.register('UTC');

describe('Graphql User Resolvers', () => {
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
});
