import { createUser, wonGame, lostGame, quitGame } from '../mutations';
import {
  wrapClient,
  createMockFind,
  createMockSort,
  createMockInsertOne,
} from '../__mocks__/mockDb';

const mockPlayers = [
  { uid: '7dac9d78-353f-409b-8a7f-2192409c44a2', name: 'Player 1' },
  { uid: '2cbf658a-3102-4e9d-b749-bac853efed0d', name: 'Player 2' },
];

const mockUid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

const mockPlayerName = 'Player Name';

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
