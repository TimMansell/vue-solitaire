import { won, lost, completed } from '../userStats';
import {
  wrapClient,
  createMockFind,
  createMockCount,
} from '../__mocks__/mockDb';

describe('Graphql UserStats Resolvers', () => {
  describe('won', () => {
    it('should correct count', async () => {
      const mockContext = wrapClient(
        createMockFind({
          ...createMockCount(100),
        })
      );

      const result = await won('', '', mockContext);

      expect(result).toEqual(100);
    });
  });

  describe('lost', () => {
    it('should correct count', async () => {
      const mockContext = wrapClient(
        createMockFind({
          ...createMockCount(333),
        })
      );

      const result = await lost('', '', mockContext);

      expect(result).toEqual(333);
    });
  });

  describe('completed', () => {
    it('should correct count', async () => {
      const mockContext = wrapClient(
        createMockFind({
          ...createMockCount(400),
        })
      );

      const result = await completed('', '', mockContext);

      expect(result).toEqual(400);
    });
  });
});
