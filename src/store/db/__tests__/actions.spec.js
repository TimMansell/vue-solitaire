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

describe('DB store', () => {
  it('newGame', async () => {
    const dispatch = jest.fn();

    await newGame({ dispatch });

    // eslint-disable-next-line no-underscore-dangle
    expect(dispatch).toHaveBeenCalledWith('setGame', mockResponse._id, { root: true });
    expect(dispatch).toHaveBeenCalledWith('user/setGameStats', mockResponse.gameNumber, {
      root: true,
    });
  });
});
