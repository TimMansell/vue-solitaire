import { won, lost, completed, players } from '../globalStats';
import { createMockCount } from './mockDb';

describe('Graphql GlobalStats Resolvers', () => {
  describe('won', () => {
    it('should correct count', async () => {
      const mockClient = createMockCount(100);

      const mockContext = {
        ...mockClient,
      };

      const result = await won('', '', mockContext);

      expect(result).toEqual(100);
    });
  });

  describe('lost', () => {
    it('should correct count', async () => {
      const mockClient = createMockCount(333);

      const mockContext = {
        ...mockClient,
      };

      const result = await lost('', '', mockContext);

      expect(result).toEqual(333);
    });
  });

  describe('completed', () => {
    it('should correct count', async () => {
      const mockClient = createMockCount(400);

      const mockContext = {
        ...mockClient,
      };

      const result = await completed('', '', mockContext);

      expect(result).toEqual(400);
    });
  });

  describe('players', () => {
    it('should correct count', async () => {
      const mockClient = createMockCount(500);

      const mockContext = {
        ...mockClient,
      };

      const result = await players('', '', mockContext);

      expect(result).toEqual(500);
    });
  });
});
