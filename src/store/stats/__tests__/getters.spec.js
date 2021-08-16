import getters from '../getters';
import defaultState from '../state';

const {
  globalStats,
  userStats,
  playerCount,
  userGameCount,
  globalGameCount,
  leaderboards,
  showStats,
  showLeaderboards,
} = getters;

const state = {
  ...defaultState(),
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

  it('leaderboards', () => {
    const result = leaderboards(state);

    expect(result).toEqual(state.leaderboards);
  });

  it('showStats', () => {
    const result = showStats(state);

    expect(result).toEqual(state.showStats);
  });

  it('showLeaderboards', () => {
    const result = showLeaderboards(state);

    expect(result).toEqual(state.showLeaderboards);
  });
});
