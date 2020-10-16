import { queries } from '../query';

const { getUser, globalStats } = queries;

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
