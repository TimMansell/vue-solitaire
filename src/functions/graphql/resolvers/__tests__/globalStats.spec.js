import { won, lost, completed, players } from '../globalStats';
import { createMockContext } from './helpers';

describe('Graphql GlobalStats Resolvers', () => {
  describe('won', () => {
    it('should correct count', async () => {
      const count = 100;
      const mockContext = createMockContext(count);

      const result = await won('', '', mockContext);

      expect(result).toEqual(count);
    });
  });

  describe('lost', () => {
    it('should correct count', async () => {
      const count = 333;
      const mockContext = createMockContext(count);

      const result = await lost('', '', mockContext);

      expect(result).toEqual(count);
    });
  });

  describe('completed', () => {
    it('should correct count', async () => {
      const count = 400;
      const mockContext = createMockContext(count);

      const result = await completed('', '', mockContext);

      expect(result).toEqual(count);
    });
  });

  describe('players', () => {
    it('should correct count', async () => {
      const count = 500;
      const mockContext = createMockContext(count);

      const result = await players('', '', mockContext);

      expect(result).toEqual(count);
    });
  });
});
