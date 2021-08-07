import { formatResponse, formatError, formatLeaderboard } from '../helpers';

const mockLeaderboards = [
  {
    rank: 1,
    date: '2021-04-29T12:25:47.907Z',
    uid: '7dac9d78-353f-409b-8a7f-2192409c44a2',
    moves: 2,
  },
  {
    rank: 2,
    date: '2021-04-29T12:26:20.825Z',
    uid: '2cbf658a-3102-4e9d-b749-bac853efed0d',
    moves: 2,
  },
];

describe('DB service', () => {
  it('formatResponse', () => {
    const value = {
      value: 5,
    };

    const responseObject = {
      data: {
        value,
      },
    };

    const result = formatResponse(responseObject);

    expect(result).toEqual({
      error: false,
      response: { value },
    });
  });

  it('formatError', () => {
    const result = formatError();

    expect(result).toEqual({
      error: true,
    });
  });

  it('formatLeaderboard', () => {
    const leaderboards = {
      data: {
        leaderboards: { moves: mockLeaderboards },
      },
    };

    const result = formatLeaderboard(leaderboards);

    expect(result).toEqual({
      leaderboards: [
        {
          date: '29-04-2021',
          moves: 2,
          rank: 1,
          uid: '7dac9d78-353f-409b-8a7f-2192409c44a2',
        },
        {
          date: '29-04-2021',
          moves: 2,
          rank: 2,
          uid: '2cbf658a-3102-4e9d-b749-bac853efed0d',
        },
      ],
    });
  });
});
