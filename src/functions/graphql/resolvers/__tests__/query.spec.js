import { userStats, globalStats } from '../query';

describe('Graphql Query Resolvers', () => {
  it('userStats', async () => {
    const stats = {
      count: 1,
      won: 1,
      lost: 1,
      completed: 1,
    };

    const mockContext = {
      client: {
        query: () => ({
          data: {
            userStats: stats,
          },
        }),
      },
    };

    const result = await userStats('', {}, mockContext);

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

    const result = await globalStats('', {}, mockContext);

    expect(result).toEqual(1);
  });
});
