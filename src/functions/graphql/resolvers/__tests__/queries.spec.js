import {
  userStats,
  globalStats,
  version,
  user,
  leaderboards,
} from '../queries';
import { version as appVersion } from '../../../../../package.json';

const mockUid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

describe('Graphql Query Resolvers', () => {
  it('userStats', () => {
    const result = userStats('', { uid: mockUid });

    expect(result).toEqual({ uid: mockUid });
  });

  it('globalStats', () => {
    const result = globalStats();

    expect(result).toEqual({});
  });

  it('version', () => {
    const result = version();

    expect(result).toEqual({ number: appVersion });
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
