import { exists } from '../findUser';
import { createMockCount } from './mockDb';

const mockUid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

describe('Graphql FindUser Resolvers', () => {
  describe('exists', () => {
    it('should return exists = true', async () => {
      const mockClient = createMockCount(1);

      const mockContext = {
        ...mockClient,
      };

      const result = await exists({ uid: mockUid }, '', mockContext);

      expect(result).toEqual(1);
    });

    it('should return exists = false', async () => {
      const mockClient = createMockCount(0);

      const mockContext = {
        ...mockClient,
      };

      const result = await exists({ uid: mockUid }, '', mockContext);

      expect(result).toEqual(0);
    });
  });
});
