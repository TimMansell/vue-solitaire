import { findUserByLID, userStats, globalStats } from '../query';

describe('Graphql Query Resolvers', () => {
  it('findUserByLID', async () => {
    const mockArgs = { uid: 100 };

    const mockContext = {
      client: {
        query: () => ({
          data: {
            findUserByLID: 1,
          },
        }),
      },
    };

    const result = await findUserByLID('', mockArgs, mockContext);

    expect(result).toEqual(1);
  });

  it('userStats', async () => {
    const stats = {
      count: 1,
      won: 1,
      lost: 1,
      completed: 1,
    };

    const mockArgs = { uid: 100 };

    const mockContext = {
      client: {
        query: () => ({
          data: {
            userStats: stats,
          },
        }),
      },
    };

    const result = await userStats('', mockArgs, mockContext);

    expect(result).toEqual(stats);
  });

  it('globalStats', async () => {
    const mockContext = {
      client: {
        query: () => ({
          data: {
            globalStats: 1,
          },
        }),
      },
    };

    const result = await globalStats('', '', mockContext);

    expect(result).toEqual(1);
  });
});
