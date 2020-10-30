import { getAUser, getUserStats, getGlobalStats } from '../queries';

jest.mock('../apollo', () => ({
  query: () => ({
    data: {
      getUser: 1,
      getUserStats: 1,
      globalStats: 1,
    },
  }),
}));

describe('DB service queries', () => {
  it('getAUser', async () => {
    const result = await getAUser(1);

    expect(result).toEqual({
      error: false,
      response: 1,
    });
  });

  it('getUserStats', async () => {
    const result = await getUserStats(1);

    expect(result).toEqual({
      error: false,
      response: 1,
    });
  });

  it('getGlobalStats', async () => {
    const result = await getGlobalStats();

    expect(result).toEqual({
      error: false,
      response: 1,
    });
  });
});
