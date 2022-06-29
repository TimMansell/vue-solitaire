import { ApolloServer, gql } from 'apollo-server-lambda';
import {
  mockUid,
  mockHistoryApi,
  mockLeaderboardsMovesAPI,
  mockLeaderboardsMovesLegacy,
  mockLeaderboardsTimesAPI,
  mockLeaderboardsTimesLegacy,
  mockPlayers,
  mockPlayerName,
} from '@/mockData';
import { version } from '../../../../package.json';
import {
  wrapClient,
  createMockFind,
  createMockFindOne,
  createMockFiltered,
  createMockCount,
  createMockSort,
  createMockInsertOne,
} from '../resolvers/__mocks__/mockDb';

import { typeDefs } from '../schema';
import { resolvers } from '../resolvers';

vi.mock('unique-names-generator', () => ({
  uniqueNamesGenerator: () => mockPlayerName,
}));

const setupTestServer = (client, variables) =>
  new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      ...client,
      variables,
    }),
  });

describe('Graphql Schema', () => {
  describe('Queries', () => {
    const mockClient = wrapClient(
      createMockFind({
        ...createMockCount(1),
      })
    );

    it('should show user stats', async () => {
      const testServer = setupTestServer(mockClient);

      const query = gql`
        query {
          userStats(uid: "1") {
            won
            lost
            completed
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
        },
      });
    });

    it('should show global stats', async () => {
      const testServer = setupTestServer(mockClient);

      const query = gql`
        query {
          globalStats {
            won
            lost
            completed
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
          players: 1,
        },
      });
    });

    it('should show version ', async () => {
      const testServer = setupTestServer(mockClient);

      const query = gql`
        query {
          version {
            number
          }
        }
      `;

      const result = await testServer.executeOperation({
        query,
      });

      expect(result.errors).toBeUndefined();
      expect(result.data).toEqual({
        version: {
          number: version,
        },
      });
    });

    it('should show history', async () => {
      const testServer = setupTestServer({
        ...wrapClient(
          createMockFind({
            ...createMockFiltered(mockHistoryApi),
            ...createMockCount(mockHistoryApi.length),
          })
        ),
      });

      const query = gql`
        query {
          user(uid: "1") {
            history(offset: 0, limit: 10) {
              date
              won
              lost
              moves
              time
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
          history: mockHistoryApi,
        },
      });
    });

    it('should show leaderboards moves', async () => {
      const testServer = setupTestServer({
        ...wrapClient(
          createMockFind({
            ...createMockFiltered(mockLeaderboardsMovesAPI),
            ...createMockSort(mockPlayers),
          })
        ),
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
          moves: mockLeaderboardsMovesLegacy,
        },
      });
    });

    it('should show leaderboards times', async () => {
      const testServer = setupTestServer({
        ...wrapClient(
          createMockFind({
            ...createMockFiltered(mockLeaderboardsTimesAPI),
            ...createMockSort(mockPlayers),
          })
        ),
      });

      const query = gql`
        query {
          leaderboards(offset: 0, limit: 10) {
            times {
              rank
              date
              player
              time
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
          times: mockLeaderboardsTimesLegacy,
        },
      });
    });
  });

  describe('Mutations', () => {
    const mockClient = wrapClient({
      ...createMockFind({
        ...createMockSort(mockPlayers),
      }),
      ...createMockFindOne({ name: mockPlayerName }),
      ...createMockInsertOne({}),
    });

    describe('createUser', () => {
      it('it should create a user', async () => {
        const variables = {
          data: {
            uid: mockUid,
          },
        };

        const testServer = setupTestServer(mockClient, variables);

        const query = gql`
          mutation WonAGame($data: UserInput!) {
            createUser(data: $data) {
              name
            }
          }
        `;

        const result = await testServer.executeOperation({
          query,
          variables,
        });

        expect(result.errors).toBeUndefined();
        expect(result.data).toEqual({
          createUser: {
            name: mockPlayerName,
          },
        });
      });
    });

    describe('Game outcome', () => {
      const variables = {
        data: {
          uid: mockUid,
          moves: 2,
          time: 10,
        },
      };

      it('wonGame', async () => {
        const testServer = setupTestServer(mockClient, variables);

        const query = gql`
          mutation WonAGame($data: GameInput!) {
            wonGame(data: $data) {
              uid
            }
          }
        `;

        const result = await testServer.executeOperation({
          query,
          variables,
        });

        expect(result.errors).toBeUndefined();
        expect(result.data).toEqual({
          wonGame: {
            uid: mockUid,
          },
        });
      });

      it('lostGame', async () => {
        const testServer = setupTestServer(mockClient, variables);

        const query = gql`
          mutation LostAGame($data: GameInput!) {
            lostGame(data: $data) {
              uid
            }
          }
        `;

        const result = await testServer.executeOperation({
          query,
          variables,
        });

        expect(result.errors).toBeUndefined();
        expect(result.data).toEqual({
          lostGame: {
            uid: mockUid,
          },
        });
      });

      it('quitGame', async () => {
        const testServer = setupTestServer(mockClient, variables);

        const query = gql`
          mutation CompletedAGame($data: GameInput!) {
            quitGame(data: $data) {
              uid
            }
          }
        `;

        const result = await testServer.executeOperation({
          query,
          variables,
        });

        expect(result.errors).toBeUndefined();
        expect(result.data).toEqual({
          quitGame: {
            uid: mockUid,
          },
        });
      });
    });
  });
});
