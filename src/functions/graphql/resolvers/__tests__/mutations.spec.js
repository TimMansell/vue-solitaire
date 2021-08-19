import { mockUid, mockPlayers, mockPlayerName } from '@/mockData';
import { createUser, wonGame, lostGame, quitGame } from '../mutations';
import {
  wrapClient,
  createMockFind,
  createMockSort,
  createMockInsertOne,
} from '../__mocks__/mockDb';

jest.mock('unique-names-generator', () => ({
  uniqueNamesGenerator: () => mockPlayerName,
}));

describe('Graphql Mutation Resolvers', () => {
  describe('Users', () => {
    it('createUser', async () => {
      const mockClient = wrapClient({
        ...createMockFind({
          ...createMockSort(mockPlayers),
        }),
        ...createMockInsertOne({}),
      });

      const mockContext = {
        ...mockClient,
        variables: {
          data: {
            uid: mockUid,
          },
        },
      };

      const { name } = await createUser('', {}, mockContext);

      expect(name).toBe(mockPlayerName);
    });
  });

  describe('Games', () => {
    let mockContext;

    const mockClient = wrapClient(createMockInsertOne({}));

    beforeAll(() => {
      mockContext = {
        ...mockClient,
        variables: {
          data: {
            moves: 50,
            time: 15,
          },
        },
      };
    });

    it('wonGame', async () => {
      const { outcome } = await wonGame('', '', mockContext);

      expect(outcome).toBe('Won');
    });

    it('lostGame', async () => {
      const { outcome } = await lostGame('', '', mockContext);

      expect(outcome).toBe('Lost');
    });

    it('quitGame', async () => {
      const { outcome } = await quitGame('', '', mockContext);

      expect(outcome).toBe('Gave Up');
    });
  });
});
