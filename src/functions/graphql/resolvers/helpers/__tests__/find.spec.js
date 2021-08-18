import { findLeaderboardItems } from '../find';
import {
  wrapClient,
  createMockFind,
  createMockSort,
  createMockFiltered,
} from '../../__mocks__/mockDb';

const mockPlayers = [
  { uid: '7dac9d78-353f-409b-8a7f-2192409c44a2', name: 'Player 1' },
  { uid: '2cbf658a-3102-4e9d-b749-bac853efed0d', name: 'Player 2' },
];

const mockLeaderboardsMovesAPI = [
  {
    date: '2021-04-29T12:25:47.907Z',
    uid: '7dac9d78-353f-409b-8a7f-2192409c44a2',
    moves: 2,
  },
  {
    date: '2021-04-29T12:26:20.825Z',
    uid: '2cbf658a-3102-4e9d-b749-bac853efed0d',
    moves: 2,
  },
];

const mockLeaderboardsTimesAPI = [
  {
    date: '2021-04-29T12:25:47.907Z',
    uid: '7dac9d78-353f-409b-8a7f-2192409c44a2',
    time: 20,
  },
  {
    date: '2021-04-29T12:26:20.825Z',
    uid: '2cbf658a-3102-4e9d-b749-bac853efed0d',
    time: 200,
  },
];

const mockLeaderboardsMoves = [
  {
    rank: 1,
    date: '29-04-2021',
    player: 'Player 1',
    moves: 2,
  },
  {
    rank: 2,
    date: '29-04-2021',
    player: 'Player 2',
    moves: 2,
  },
];

const mockLeaderboardsTimes = [
  {
    rank: 1,
    date: '29-04-2021',
    player: 'Player 1',
    duration: '0:00:20',
  },
  {
    rank: 2,
    date: '29-04-2021',
    player: 'Player 2',
    duration: '0:03:20',
  },
];

describe('Graphql Resolver Helpers', () => {
  it('should return formatted leaderboard moves', async () => {
    const { client } = wrapClient(
      createMockFind({
        ...createMockFiltered(mockLeaderboardsMovesAPI),
        ...createMockSort(mockPlayers),
      })
    );

    const result = await findLeaderboardItems(client, '', 'moves');

    expect(result).toEqual(mockLeaderboardsMoves);
  });

  it('should return formatted leaderboard times', async () => {
    const { client } = wrapClient(
      createMockFind({
        ...createMockFiltered(mockLeaderboardsTimesAPI),
        ...createMockSort(mockPlayers),
      })
    );

    const result = await findLeaderboardItems(client, '', 'time');

    expect(result).toEqual(mockLeaderboardsTimes);
  });
});
