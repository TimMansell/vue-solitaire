import { getAUser, getGlobalStats } from '../queries';

jest.mock('../apollo', () => ({
  query: () => ({
    data: {
      getUser: 1,
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

  it('getGlobalStats', async () => {
    const result = await getGlobalStats();

    expect(result).toEqual({
      error: false,
      response: 1,
    });
  });
});
