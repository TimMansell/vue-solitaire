import { leaderboardsQuery } from '../helpers';

describe('DB service - helpers', () => {
  it('returns moves object', () => {
    const result = leaderboardsQuery('Times');

    expect(result).toEqual({
      key: 'times',
      query: 'duration',
    });
  });

  it('returns times object', () => {
    const result = leaderboardsQuery('Moves');

    expect(result).toEqual({
      key: 'moves',
      query: 'moves',
    });
  });
});
