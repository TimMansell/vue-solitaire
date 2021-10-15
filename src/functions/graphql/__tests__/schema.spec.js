import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';
import { graphql } from 'graphql';

import { typeDefs } from '../schema';

const mocks = {
  ID: () => 123,
  Int: () => 1,
  String: () => 'String',
  Boolean: () => true,
};

const schema = makeExecutableSchema({ typeDefs });

const schemaWithMocks = addMocksToSchema({ schema, mocks });

describe('Graphql Schema', () => {
  describe('Queries', () => {
    it('userStats', async () => {
      const query = `
        query {
          userStats(uid: "1") {
            won
            lost
            completed
            abandoned
          }
        }
      `;

      const result = await graphql(schemaWithMocks, query).then(
        (response) => response
      );

      expect(result).toEqual({
        data: {
          userStats: {
            won: 1,
            lost: 1,
            completed: 1,
            abandoned: 1,
          },
        },
      });
    });

    it('globalStats', async () => {
      const query = `
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

      const result = await graphql(schemaWithMocks, query).then(
        (response) => response
      );

      expect(result).toEqual({
        data: {
          globalStats: {
            won: 1,
            lost: 1,
            completed: 1,
            abandoned: 1,
            players: 1,
          },
        },
      });
    });

    it('version', async () => {
      const query = `
        query {
          version(localVersion:"1.0.0") {
            number
            matches
          }
        }
      `;

      const result = await graphql(schemaWithMocks, query).then(
        (response) => response
      );

      expect(result).toEqual({
        data: {
          version: {
            number: 'String',
            matches: true,
          },
        },
      });
    });

    it('history', async () => {
      const query = `
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

      const result = await graphql(schemaWithMocks, query).then(
        (response) => response
      );

      expect(result).toEqual({
        data: {
          user: {
            history: [
              {
                number: 1,
                date: 'String',
                time: 'String',
                outcome: 'String',
                moves: 1,
                duration: 'String',
              },
              {
                number: 1,
                date: 'String',
                time: 'String',
                outcome: 'String',
                moves: 1,
                duration: 'String',
              },
            ],
          },
        },
      });
    });

    it('leaderboards - moves', async () => {
      const query = `
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

      const result = await graphql(schemaWithMocks, query).then(
        (response) => response
      );

      expect(result).toEqual({
        data: {
          leaderboards: {
            moves: [
              {
                rank: 1,
                date: 'String',
                player: 'String',
                moves: 1,
              },
              {
                rank: 1,
                date: 'String',
                player: 'String',
                moves: 1,
              },
            ],
          },
        },
      });
    });

    it('leaderboards - times', async () => {
      const query = `
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

      const result = await graphql(schemaWithMocks, query).then(
        (response) => response
      );

      expect(result).toEqual({
        data: {
          leaderboards: {
            times: [
              {
                rank: 1,
                date: 'String',
                player: 'String',
                duration: 'String',
              },
              {
                rank: 1,
                date: 'String',
                player: 'String',
                duration: 'String',
              },
            ],
          },
        },
      });
    });
  });
});
