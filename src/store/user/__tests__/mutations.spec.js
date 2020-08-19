import mutations from '../mutations';

const { SET_USER_ID, SET_USER_SID, SET_USER_GAME_STATS } = mutations;

describe('User', () => {
  it('SET_USER_ID', () => {
    const luid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';
    const state = { luid };

    SET_USER_ID(state, luid);

    expect(state.luid).toEqual(luid);
  });

  it('SET_USER_SID', () => {
    const suid = 123;
    const state = { suid };

    SET_USER_SID(state, suid);

    expect(state.suid).toEqual(suid);
  });

  it('SET_USER_GAME_STATS', () => {
    const stats = {
      totalGames: 1,
    };
    const state = { stats };

    SET_USER_GAME_STATS(state, stats);

    expect(state.stats).toEqual(stats);
  });
});
