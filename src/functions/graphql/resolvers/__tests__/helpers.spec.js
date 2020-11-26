import { runQuery, runMutation } from '../helpers';

describe('Graphql Resolver helpers', () => {
  it('runQuery', async () => {
    const mockContext = {
      client: {
        query: () => ({
          data: {
            test: 1,
          },
        }),
      },
    };

    const result = await runQuery(mockContext);

    expect(result).toEqual({ test: 1 });
  });

  it('runMutation', async () => {
    const mockContext = {
      client: {
        mutate: () => ({
          data: {
            test: 1,
          },
        }),
      },
    };

    const result = await runMutation(mockContext);

    expect(result).toEqual({ test: 1 });
  });
});
