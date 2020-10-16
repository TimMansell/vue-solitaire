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
    it('getAUser', async () => {
      const query = `
        query {
          getUser(uid: "1") {
            uid
          }
        }
      `;

      const result = await graphql(schemaWithMocks, query).then((response) => response);

      expect(result).toEqual({
        data: {
          getUser: {
            uid: 'String',
          },
        },
      });
    });

    it('globalStats', async () => {
      const query = `
        query {
          globalStats {
            count
          }
        }
      `;

      const result = await graphql(schemaWithMocks, query).then((response) => response);

      expect(result).toEqual({
        data: {
          globalStats: {
            count: 1,
          },
        },
      });
    });
  });

  describe('Mutations', () => {
    it('createUser', async () => {
      const query = `
        mutation {
          createUser(uid: "1") {
            _id
          }
        }
      `;

      const result = await graphql(schemaWithMocks, query).then((response) => response);

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

      const result = await graphql(schemaWithMocks, query).then((response) => response);

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

      const result = await graphql(schemaWithMocks, query).then((response) => response);

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

      const result = await graphql(schemaWithMocks, query).then((response) => response);

      expect(result).toEqual({
        data: {
          lostGame: {
            _id: '123',
          },
        },
      });
    });

    it('completedGame', async () => {
      const query = `
        mutation {
          completedGame(id: "1", data: {}) {
            _id
          }
        }
      `;

      const result = await graphql(schemaWithMocks, query).then((response) => response);

      expect(result).toEqual({
        data: {
          completedGame: {
            _id: '123',
          },
        },
      });
    });
  });
});
