import { moves, times } from '../leaderboards';
import { createMockFind } from './mockDb';

const mockLeaderboardsMoves = [
  {
    rank: 1,
    date: '2021-04-29T12:25:47.907Z',
    uid: '7dac9d78-353f-409b-8a7f-2192409c44a2',
    moves: 2,
  },
  {
    rank: 2,
    date: '2021-04-29T12:26:20.825Z',
    uid: '2cbf658a-3102-4e9d-b749-bac853efed0d',
    moves: 2,
  },
];

const mockLeaderboardsTimes = [
  {
    rank: 1,
    date: '2021-04-29T12:25:47.907Z',
    uid: '7dac9d78-353f-409b-8a7f-2192409c44a2',
    time: 20,
  },
  {
    rank: 2,
    date: '2021-04-29T12:26:20.825Z',
    uid: '2cbf658a-3102-4e9d-b749-bac853efed0d',
    time: 200,
  },
];

describe('Graphql Leaderboards Resolvers', () => {
  describe('moves', () => {
    it('should return top moves', async () => {
      const mockClient = createMockFind(mockLeaderboardsMoves);

      const mockContext = {
        ...mockClient,
      };

      const result = await moves('', '', mockContext);

      expect(result).toEqual([
        {
          rank: 1,
          date: '29-04-2021',
          uid: '7dac9d78-353f-409b-8a7f-2192409c44a2',
          moves: 2,
        },
        {
          rank: 2,
          date: '29-04-2021',
          uid: '2cbf658a-3102-4e9d-b749-bac853efed0d',
          moves: 2,
        },
      ]);
    });
  });

  describe('times', () => {
    it('should return top times', async () => {
      const mockClient = createMockFind(mockLeaderboardsTimes);

      const mockContext = {
        ...mockClient,
      };

      const result = await times('', '', mockContext);

      expect(result).toEqual([
        {
          rank: 1,
          date: '29-04-2021',
          uid: '7dac9d78-353f-409b-8a7f-2192409c44a2',
          time: '0:00:20',
        },
        {
          rank: 2,
          date: '29-04-2021',
          uid: '2cbf658a-3102-4e9d-b749-bac853efed0d',
          time: '0:03:20',
        },
      ]);
    });
  });
});
