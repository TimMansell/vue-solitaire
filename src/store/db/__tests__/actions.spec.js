import actions from '../actions';

const { newGame } = actions;

const mockResponse = {
  _id: 123,
  gameNumber: 2,
};

jest.mock('@/services/db', () => ({
  newGame: () => ({
    response: mockResponse,
  }),
}));

jest.mock('@/services/user', () => ({
  getUser: () => 1,
}));

describe('DB store', () => {
  it('newGame', async () => {
    const commit = jest.fn();

    await newGame({ commit });

    // eslint-disable-next-line no-underscore-dangle
    expect(commit).toHaveBeenCalledWith('SET_GAME', { id: mockResponse._id });
    expect(commit).toHaveBeenCalledWith('SET_USER_GAMES', mockResponse.gameNumber);
  });
});
