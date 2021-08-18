import { formatResponse, formatError, formatData } from '../helpers';

const mockLeaderboardsMoves = [
  {
    rank: 1,
    date: '29-04-2021',
    player: 'Player 1',
    moves: 2,
  },
  {
    rank: 2,
    date: '29-04-2021',
    player: 'Player 2',
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

  it('formatData', () => {
    const leaderboards = {
      data: {
        leaderboards: { moves: mockLeaderboardsMoves },
      },
    };

    const result = formatData(leaderboards);

    expect(result).toEqual({
      leaderboards: mockLeaderboardsMoves,
    });
  });
});
