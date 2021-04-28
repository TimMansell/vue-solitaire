import { userStats, globalStats, findUser } from '../queries';

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

  it('findUser', () => {
    const result = findUser('', { uid: mockUid });

    expect(result).toEqual({ uid: mockUid });
  });
});
