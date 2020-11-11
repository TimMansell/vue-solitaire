import { setupQuery, setupMutation } from '../helpers';

describe('Graphql Resolver helpers', () => {
  it('setupQuery', async () => {
    const mockContext = {
      client: {
        query: () => ({
          data: {
            test: 1,
          },
        }),
      },
    };

    const query = setupQuery('test');
    const result = await query({}, mockContext);

    expect(result).toEqual(1);
  });

  it('setupMutation', async () => {
    const mockContext = {
      client: {
        mutate: () => ({
          data: {
            test: 1,
          },
        }),
      },
    };

    const mutation = setupMutation('test');
    const result = await mutation({}, mockContext);

    expect(result).toEqual(1);
  });
});
