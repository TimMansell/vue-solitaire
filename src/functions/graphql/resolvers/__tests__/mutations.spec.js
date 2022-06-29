import { mockUid, mockPlayers, mockPlayerName } from '@/mockData';
import { createUser, wonGame, lostGame, quitGame } from '../mutations';
import { parseAndValidDate } from '../../../../helpers/dates';
import {
  wrapClient,
  createMockFind,
  createMockSort,
  createMockInsertOne,
} from '../__mocks__/mockDb';

vi.mock('unique-names-generator', () => ({
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
      const { completed, date, lost, won, moves, time } = await wonGame(
        '',
        '',
        mockContext
      );

      expect(completed).toEqual(true);
      expect(parseAndValidDate(date)).toEqual(true);
      expect(lost).toEqual(false);
      expect(won).toEqual(true);
      expect(moves).toEqual(50);
      expect(time).toEqual(15);
    });

    it('lostGame', async () => {
      const { completed, date, lost, won, moves, time } = await lostGame(
        '',
        '',
        mockContext
      );

      expect(completed).toEqual(true);
      expect(parseAndValidDate(date)).toEqual(true);
      expect(lost).toEqual(true);
      expect(won).toEqual(false);
      expect(moves).toEqual(50);
      expect(time).toEqual(15);
    });

    it('quitGame', async () => {
      const { completed, date, lost, won, moves, time } = await quitGame(
        '',
        '',
        mockContext
      );

      expect(completed).toEqual(true);
      expect(parseAndValidDate(date)).toEqual(true);
      expect(lost).toEqual(false);
      expect(won).toEqual(false);
      expect(moves).toEqual(50);
      expect(time).toEqual(15);
    });
  });
});
