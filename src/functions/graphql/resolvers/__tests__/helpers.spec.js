import { formatLeaderboardItems, formatLeaderboardTimes } from '../helpers';
// import { createMockFind } from './mockDb';

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

describe('Graphql Resolver Helpers', () => {
  it('should return formatted leaderboard items', async () => {
    const result = formatLeaderboardItems(mockLeaderboardsMoves);

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

  it('should return formatted leaderboard times', async () => {
    const result = formatLeaderboardTimes(mockLeaderboardsTimes);

    expect(result).toEqual([
      {
        rank: 1,
        date: '2021-04-29T12:25:47.907Z',
        uid: '7dac9d78-353f-409b-8a7f-2192409c44a2',
        time: '0:00:20',
      },
      {
        rank: 2,
        date: '2021-04-29T12:26:20.825Z',
        uid: '2cbf658a-3102-4e9d-b749-bac853efed0d',
        time: '0:03:20',
      },
    ]);
  });
});
