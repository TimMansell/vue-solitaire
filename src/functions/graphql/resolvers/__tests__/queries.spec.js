import { mockUid } from '@/mockData';
import { userStats, globalStats, user, leaderboards } from '../queries';

describe('Graphql Query Resolvers', () => {
  it('userStats', () => {
    const result = userStats('', { uid: mockUid });

    expect(result).toEqual({ uid: mockUid });
  });

  it('globalStats', () => {
    const result = globalStats();

    expect(result).toEqual({});
  });

  it('user', () => {
    const result = user('', { uid: mockUid });

    expect(result).toEqual({ uid: mockUid });
  });

  it('leaderboards', () => {
    const result = leaderboards('', { offset: 0, limit: 2 });

    expect(result).toEqual({ offset: 0, limit: 2 });
  });
});
