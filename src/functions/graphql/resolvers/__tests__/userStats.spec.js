import { won, lost, completed } from '../userStats';
import { createMockContext } from './helpers';

describe('Graphql UserStats Resolvers', () => {
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
});
