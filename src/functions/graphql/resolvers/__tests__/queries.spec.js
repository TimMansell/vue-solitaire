import { userStats, globalStats, findUser } from '../queries';

const uid = '123';

describe('Graphql Query Resolvers', () => {
  it('userStats', async () => {
    const result = userStats('', { uid });

    expect(result).toEqual({ uid });
  });

  it('globalStats', () => {
    const result = globalStats();

    expect(result).toEqual({});
  });

  it('findUser', async () => {
    const result = findUser('', { uid });

    expect(result).toEqual({ uid });
  });
});
