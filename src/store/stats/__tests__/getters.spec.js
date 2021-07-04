import getters from '../getters';

const {
  globalStats,
  userStats,
  playerCount,
  userGameCount,
  globalGameCount,
  showStats,
} = getters;

const state = {
  globalStats: {
    won: 1,
    lost: 1,
    completed: 2,
  },
  userStats: {
    won: 1,
    lost: 1,
    completed: 2,
  },
  playerCount: 1,
  userGameCount: 2,
  globalGameCount: 3,
  showStats: true,
};

describe('Stats Store', () => {
  it('globalStats', () => {
    const result = globalStats(state);

    expect(result).toEqual(state.globalStats);
  });

  it('userStats', () => {
    const result = userStats(state);

    expect(result).toEqual(state.userStats);
  });

  it('playerCount', () => {
    const result = playerCount(state);

    expect(result).toEqual(state.playerCount);
  });

  it('userGameCount', () => {
    const result = userGameCount(state);

    expect(result).toEqual(state.userGameCount);
  });

  it('globalGameCount', () => {
    const result = globalGameCount(state);

    expect(result).toEqual(state.globalGameCount);
  });

  it('showStats', () => {
    const result = showStats(state);

    expect(result).toEqual(state.showStats);
  });
});
