import {
  mockLeaderboardsMovesAPI,
  mockLeaderboardsMoves,
  mockLeaderboardsTimesAPI,
  mockLeaderboardsTimes,
  mockPlayers,
} from '@/mockData';
import { findLeaderboardItems } from '../leaderboards';
import {
  wrapClient,
  createMockFind,
  createMockSort,
  createMockFiltered,
} from '../../__mocks__/mockDb';

describe('Graphql Resolver Helpers', () => {
  it('should return formatted leaderboard moves', async () => {
    const { client } = wrapClient(
      createMockFind({
        ...createMockFiltered(mockLeaderboardsMovesAPI),
        ...createMockSort(mockPlayers),
      })
    );

    const result = await findLeaderboardItems({
      context: { client },
      parent: '',
      find: 'moves',
    });

    expect(result).toEqual(mockLeaderboardsMoves);
  });

  it('should return formatted leaderboard times', async () => {
    const { client } = wrapClient(
      createMockFind({
        ...createMockFiltered(mockLeaderboardsTimesAPI),
        ...createMockSort(mockPlayers),
      })
    );

    const result = await findLeaderboardItems({
      context: { client },
      parent: '',
      find: 'time',
    });

    expect(result).toEqual(mockLeaderboardsTimes);
  });
});
