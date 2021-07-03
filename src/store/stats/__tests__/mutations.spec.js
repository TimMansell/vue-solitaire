import mutations from '../mutations';

const {
  SET_GLOBAL_STATS,
  SET_USER_STATS,
  SET_USER_GAME_COUNT,
  SET_GLOBAL_GAME_COUNT,
  SET_GLOBAL_PLAYER_COUNT,
  CLEAR_STATS,
  SHOW_STATS,
} = mutations;

const mockStats = { won: 1, lost: 1, completed: 2, players: 4 };

describe('Stats Store', () => {
  it('SET_GLOBAL_STATS', () => {
    const state = { globalStats: mockStats };

    SET_GLOBAL_STATS(state, mockStats);

    expect(state.globalStats).toEqual(mockStats);
  });

  it('SET_USER_STATS', () => {
    const state = { userStats: mockStats };

    SET_USER_STATS(state, mockStats);

    expect(state.userStats).toEqual(mockStats);
  });

  it('SET_USER_GAME_COUNT', () => {
    const state = { userStats: mockStats };

    SET_USER_GAME_COUNT(state, mockStats);

    expect(state.userGameCount).toEqual(2);
  });

  it('SET_GLOBAL_GAME_COUNT', () => {
    const state = { globalStats: mockStats };

    SET_GLOBAL_GAME_COUNT(state, mockStats);

    expect(state.globalGameCount).toEqual(2);
  });

  it('SET_GLOBAL_PLAYER_COUNT', () => {
    const state = { globalStats: mockStats };

    SET_GLOBAL_PLAYER_COUNT(state, mockStats);

    expect(state.playerCount).toEqual(4);
  });

  it('CLEAR_STATS', () => {
    const state = { userStats: mockStats, globalStats: mockStats };

    CLEAR_STATS(state, mockStats);

    expect(state.userStats).toEqual({});
    expect(state.globalStats).toEqual({});
  });

  it('SHOW_STATS', () => {
    const showStats = true;
    const state = { showStats };

    SHOW_STATS(state, showStats);

    expect(state.showStats).toEqual(showStats);
  });
});
