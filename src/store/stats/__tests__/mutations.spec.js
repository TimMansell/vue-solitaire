import mutations from '../mutations';

const { SET_GLOBAL_STATS } = mutations;

describe('Stats', () => {
  it('SET_USER_ID', () => {
    const globalStats = { count: 1 };
    const state = { globalStats };

    SET_GLOBAL_STATS(state, globalStats);

    expect(state.globalStats).toEqual(globalStats);
  });
});
