import {
  mockLeaderboardsTimesAPI,
  mockLeaderboardsMovesAPI,
  mockLeaderboardsTimesLegacy,
  mockLeaderboardsMovesLegacy,
  mockPlayers,
} from '@/mockData';
import { findLeaderboardItems } from '../find';
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

    const result = await findLeaderboardItems(client, '', 'moves');

    expect(result).toEqual(mockLeaderboardsMovesLegacy);
  });

  it('should return formatted leaderboard times', async () => {
    const { client } = wrapClient(
      createMockFind({
        ...createMockFiltered(mockLeaderboardsTimesAPI),
        ...createMockSort(mockPlayers),
      })
    );

    const result = await findLeaderboardItems(client, '', 'time');

    expect(result).toEqual(mockLeaderboardsTimesLegacy);
  });
});
