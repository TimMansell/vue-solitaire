import { mockLeaderboardsMoves } from '@/mockData';
import { formatResponse, formatError, formatData } from '../helpers';

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
