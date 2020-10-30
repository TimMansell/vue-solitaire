import { queries } from '../query';

const { getUser, getUserStats, globalStats } = queries;

describe('Graphql Query Resolvers', () => {
  it('getUser', async () => {
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

    const result = await getUser('', mockArgs, mockContext);

    expect(result).toEqual(1);
  });

  it('getUserStats', async () => {
    const userStats = {
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
            userStats,
          },
        }),
      },
    };

    const result = await getUserStats('', mockArgs, mockContext);

    expect(result).toEqual(userStats);
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
