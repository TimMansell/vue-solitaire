import { exists } from '../findUser';
import { createMockContext } from './helpers';

const mockUid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

describe('Graphql FindUser Resolvers', () => {
  describe('exists', () => {
    it('should return exists = true', async () => {
      const mockContext = createMockContext(1);

      const result = await exists({ uid: mockUid }, '', mockContext);

      expect(result).toEqual(1);
    });

    it('should return exists = false', async () => {
      const mockContext = createMockContext(0);

      const result = await exists({ uid: mockUid }, '', mockContext);

      expect(result).toEqual(0);
    });
  });
});
