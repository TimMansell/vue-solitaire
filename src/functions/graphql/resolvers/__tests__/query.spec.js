import { queries } from '../query';

const { getUser } = queries;

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
});
