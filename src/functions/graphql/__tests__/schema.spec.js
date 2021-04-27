import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';
import { graphql } from 'graphql';

import { typeDefs } from '../schema';

const mocks = {
  ID: () => 123,
  Int: () => 1,
  String: () => 'String',
};

const schema = makeExecutableSchema({ typeDefs });

const schemaWithMocks = addMocksToSchema({ schema, mocks });

describe('Graphql Schema', () => {
  describe('Queries', () => {
    it('findUserByLID', async () => {
      const query = `
        query {
          findUserByLID(uid: "1") {
            uid
          }
        }
      `;

      const result = await graphql(schemaWithMocks, query).then(
        (response) => response
      );

      expect(result).toEqual({
        data: {
          findUserByLID: {
            uid: 'String',
          },
        },
      });
    });

    it('userStats', async () => {
      const query = `
        query {
          userStats(uid: "1") {
            count
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
            count: 1,
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
            count
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
            count: 1,
            completed: 1,
            players: 1,
          },
        },
      });
    });
  });

  describe('Mutations', () => {
    it('createUser', async () => {
      const query = `
      mutation {
        createUser(data: {}) {
          _id
        }
      }
      `;

      const result = await graphql(schemaWithMocks, query).then(
        (response) => response
      );

      expect(result).toEqual({
        data: {
          createUser: {
            _id: '123',
          },
        },
      });
    });

    it('newGame', async () => {
      const query = `
        mutation {
          newGame(uid: "1") {
            _id
          }
        }
      `;

      const result = await graphql(schemaWithMocks, query).then(
        (response) => response
      );

      expect(result).toEqual({
        data: {
          newGame: {
            _id: '123',
          },
        },
      });
    });

    it('wonGame', async () => {
      const query = `
        mutation {
          wonGame(id: "1", data: {}) {
            _id
          }
        }
      `;

      const result = await graphql(schemaWithMocks, query).then(
        (response) => response
      );

      expect(result).toEqual({
        data: {
          wonGame: {
            _id: '123',
          },
        },
      });
    });

    it('lostGame', async () => {
      const query = `
        mutation {
          lostGame(id: "1", data: {}) {
            _id
          }
        }
      `;

      const result = await graphql(schemaWithMocks, query).then(
        (response) => response
      );

      expect(result).toEqual({
        data: {
          lostGame: {
            _id: '123',
          },
        },
      });
    });

    it('quitGame', async () => {
      const query = `
        mutation {
          quitGame(id: "1", data: {}) {
            _id
          }
        }
      `;

      const result = await graphql(schemaWithMocks, query).then(
        (response) => response
      );

      expect(result).toEqual({
        data: {
          quitGame: {
            _id: '123',
          },
        },
      });
    });
  });
});
