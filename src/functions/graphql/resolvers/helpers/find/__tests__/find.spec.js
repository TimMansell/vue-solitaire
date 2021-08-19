import tzMock from 'timezone-mock';
import {
  mockHistoryApi,
  mockHistory,
  mockLeaderboardsMovesAPI,
  mockLeaderboardsMoves,
  mockPlayers,
} from '@/mockData';
import { formatLeaderboardGames, formatHistoryGames } from '../find';

tzMock.register('UTC');

describe('Graphql Resolver Helpers', () => {
  it('should return formatted leaderboard games', async () => {
    const result = formatLeaderboardGames(
      mockLeaderboardsMovesAPI,
      mockPlayers
    );

    expect(result).toEqual(mockLeaderboardsMoves);
  });

  it('should return formatted history games', async () => {
    const result = formatHistoryGames(mockHistoryApi, 0, mockHistoryApi.length);

    expect(result).toEqual(mockHistory);
  });
});
