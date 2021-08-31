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

  describe('Mutations', () => {
    it('createUser', async () => {
      const query = `
      mutation {
        createUser(data: {uid: "1"}) {
          name
        }
      }
      `;

      const result = await graphql(schemaWithMocks, query).then(
        (response) => response
      );

      expect(result).toEqual({
        data: {
          createUser: {
            name: 'String',
          },
        },
      });
    });

    it('newGame', async () => {
      const query = `
      mutation {
        newGame(data: {uid: "1"}) {
          cards {
            id
            value
            order
            suit
          }
        }
      }
      `;

      const result = await graphql(schemaWithMocks, query).then(
        (response) => response
      );

      expect(result).toEqual({
        data: {
          newGame: {
            cards: [
              {
                id: 1,
                value: 'String',
                order: 1,
                suit: 'String',
              },
              {
                id: 1,
                value: 'String',
                order: 1,
                suit: 'String',
              },
            ],
          },
        },
      });
    });

    it('wonGame', async () => {
      const query = `
        mutation {
          wonGame(data: {uid: "1", moves:2, time: 10}) {
            outcome
          }
        }
      `;

      const result = await graphql(schemaWithMocks, query).then(
        (response) => response
      );

      expect(result).toEqual({
        data: {
          wonGame: {
            outcome: 'String',
          },
        },
      });
    });

    it('lostGame', async () => {
      const query = `
        mutation {
          lostGame(data: {uid: "1", moves:2, time: 10}) {
            outcome
          }
        }
      `;

      const result = await graphql(schemaWithMocks, query).then(
        (response) => response
      );

      expect(result).toEqual({
        data: {
          lostGame: {
            outcome: 'String',
          },
        },
      });
    });

    it('quitGame', async () => {
      const query = `
        mutation {
          quitGame(data: {uid: "1", moves:2, time: 10}) {
            outcome
          }
        }
      `;

      const result = await graphql(schemaWithMocks, query).then(
        (response) => response
      );

      expect(result).toEqual({
        data: {
          quitGame: {
            outcome: 'String',
          },
        },
      });
    });
  });
});
