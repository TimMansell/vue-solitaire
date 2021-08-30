import { saveGameQuery, leaderboardsQuery } from '../helpers';

describe('DB service - helpers', () => {
  it('returns won game', () => {
    const result = saveGameQuery({ won: true });

    expect(result).toBe('wonGame');
  });

  it('returns lost game', () => {
    const result = saveGameQuery({ lost: true });

    expect(result).toBe('lostGame');
  });

  it('returns quit game', () => {
    const result = saveGameQuery({ quit: true });

    expect(result).toBe('quitGame');
  });

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
