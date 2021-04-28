import { createUser, wonGame, lostGame, quitGame } from '../mutations';
import { parseAndValidDate } from '../helpers';

const mockClient = {
  client: () => ({
    collection: () => ({
      insertOne: () => ({}),
    }),
  }),
};

describe('Graphql Mutation Resolvers', () => {
  describe('Users', () => {
    it('createUser', async () => {
      const mockContext = {
        ...mockClient,
        variables: {
          data: {
            uid: '123',
          },
        },
      };

      const { uid } = await createUser('', {}, mockContext);

      expect(uid).toEqual('123');
    });
  });

  describe('Games', () => {
    let mockContext;

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
