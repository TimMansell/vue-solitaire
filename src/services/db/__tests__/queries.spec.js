import { getAUser } from '../queries';

jest.mock('../apollo', () => ({
  query: () => ({
    data: {
      getUser: 1,
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
});
