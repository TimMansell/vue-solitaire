import {
  mockLeaderboardsMovesAPI,
  mockLeaderboardsMovesLegacy,
  mockLeaderboardsTimesAPI,
  mockLeaderboardsTimesLegacy,
  mockPlayers,
} from '@/mockData';
import { moves, times } from '../leaderboards';
import {
  wrapClient,
  createMockFind,
  createMockSort,
  createMockFiltered,
} from '../__mocks__/mockDb';

describe('Graphql Leaderboards Resolvers', () => {
  describe('moves', () => {
    it('should return top moves', async () => {
      const mockContext = wrapClient(
        createMockFind({
          ...createMockFiltered(mockLeaderboardsMovesAPI),
          ...createMockSort(mockPlayers),
        })
      );

      const result = await moves('', '', mockContext);

      expect(result).toEqual(mockLeaderboardsMovesLegacy);
    });
  });

  describe('times', () => {
    it('should return top times', async () => {
      const mockContext = wrapClient(
        createMockFind({
          ...createMockFiltered(mockLeaderboardsTimesAPI),
          ...createMockSort(mockPlayers),
        })
      );

      const result = await times('', '', mockContext);

      expect(result).toEqual(mockLeaderboardsTimesLegacy);
    });
  });
});
