import { ApolloServer, gql } from 'apollo-server-lambda';
import {
  mockHistoryApi,
  mockHistory,
  mockLeaderboardsMovesAPI,
  mockLeaderboardsMoves,
  mockLeaderboardsTimesAPI,
  mockLeaderboardsTimes,
  mockPlayers,
} from '@/mockData';
import { version } from '../../../../package.json';
import {
  wrapClient,
  createMockFind,
  createMockFiltered,
  createMockCount,
  createMockSort,
} from '../resolvers/__mocks__/mockDb';

import { typeDefs } from '../schema';
import { resolvers } from '../resolvers';

const client = wrapClient(
  createMockFind({
    ...createMockCount(1),
  })
);

describe('Graphql Schema', () => {
  describe('Queries', () => {
    it('should show user stats', async () => {
      const testServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({ ...client }),
      });

      const query = gql`
        query {
          userStats(uid: "1") {
            won
            lost
            completed
            abandoned
          }
        }
      `;

      const result = await testServer.executeOperation({
        query,
      });

      expect(result.errors).toBeUndefined();
      expect(result.data).toEqual({
        userStats: {
          won: 1,
          lost: 1,
          completed: 1,
          abandoned: -1,
        },
      });
    });

    it('should show global stats', async () => {
      const testServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({ ...client }),
      });

      const query = gql`
        query {
          globalStats {
            won
            lost
            completed
            abandoned
            players
          }
        }
      `;

      const result = await testServer.executeOperation({
        query,
      });

      expect(result.errors).toBeUndefined();
      expect(result.data).toEqual({
        globalStats: {
          won: 1,
          lost: 1,
          completed: 1,
          abandoned: -1,
          players: 1,
        },
      });
    });

    it('should match version ', async () => {
      const testServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({ ...client }),
      });

      const query = gql`
        query {
          version(localVersion: "${version}") {
            number
            matches
          }
        }
      `;

      const result = await testServer.executeOperation({
        query,
      });

      expect(result.errors).toBeUndefined();
      expect(result.data).toEqual({
        version: {
          matches: true,
          number: version,
        },
      });
    });

    it('should not match version', async () => {
      const testServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({ ...client }),
      });

      const query = gql`
        query {
          version(localVersion: "1.0.0") {
            number
            matches
          }
        }
      `;

      const result = await testServer.executeOperation({
        query,
      });

      expect(result.errors).toBeUndefined();
      expect(result.data).toEqual({
        version: {
          matches: false,
          number: version,
        },
      });
    });

    it('should show history', async () => {
      const testServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({
          ...wrapClient(
            createMockFind({
              ...createMockFiltered(mockHistoryApi),
              ...createMockCount(mockHistoryApi.length),
            })
          ),
        }),
      });

      const query = gql`
        query {
          user(uid: "1") {
            history(offset: 0, limit: 10) {
              number
              date
              time
              outcome
              moves
              duration
            }
          }
        }
      `;

      const result = await testServer.executeOperation({
        query,
      });

      expect(result.errors).toBeUndefined();
      expect(result.data).toEqual({
        user: {
          history: mockHistory,
        },
      });
    });

    it('should show leaderboards moves', async () => {
      const testServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({
          ...wrapClient(
            createMockFind({
              ...createMockFiltered(mockLeaderboardsMovesAPI),
              ...createMockSort(mockPlayers),
            })
          ),
        }),
      });

      const query = gql`
        query {
          leaderboards(offset: 0, limit: 10) {
            moves {
              rank
              date
              player
              moves
            }
          }
        }
      `;

      const result = await testServer.executeOperation({
        query,
      });

      expect(result.errors).toBeUndefined();
      expect(result.data).toEqual({
        leaderboards: {
          moves: mockLeaderboardsMoves,
        },
      });
    });

    it('should show leaderboards times', async () => {
      const testServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({
          ...wrapClient(
            createMockFind({
              ...createMockFiltered(mockLeaderboardsTimesAPI),
              ...createMockSort(mockPlayers),
            })
          ),
        }),
      });

      const query = gql`
        query {
          leaderboards(offset: 0, limit: 10) {
            times {
              rank
              date
              player
              duration
            }
          }
        }
      `;

      const result = await testServer.executeOperation({
        query,
      });

      expect(result.errors).toBeUndefined();
      expect(result.data).toEqual({
        leaderboards: {
          times: mockLeaderboardsTimes,
        },
      });
    });
  });
});
