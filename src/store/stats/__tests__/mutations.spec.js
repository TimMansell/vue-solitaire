import mutations from '../mutations';

const { SET_GLOBAL_STATS_COUNT, SET_FULL_STATS, SHOW_STATS } = mutations;

describe('Stats', () => {
  it('SET_GLOBAL_STATS_COUNT', () => {
    const globalStats = { count: 1 };
    const state = { globalStats };

    SET_GLOBAL_STATS_COUNT(state, globalStats);

    expect(state.globalStats).toEqual(globalStats);
  });

  it('SET_FULL_STATS', () => {
    const fullUserStats = {
      count: 4,
      won: 1,
      lost: 1,
      completed: 2,
    };
    const state = { fullUserStats };

    SET_FULL_STATS(state, fullUserStats);

    expect(state.fullUserStats).toEqual(fullUserStats);
  });

  it('SHOW_STATS', () => {
    const showStats = true;
    const state = { showStats };

    SHOW_STATS(state, showStats);

    expect(state.showStats).toEqual(showStats);
  });
});
