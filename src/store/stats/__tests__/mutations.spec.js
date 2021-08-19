import { mockStats, mockLeaderboardsMoves } from '@/mockData';
import mutations from '../mutations';
import defaultState from '../state';

const {
  SET_GLOBAL_STATS,
  SET_USER_STATS,
  SET_USER_GAME_COUNT,
  SET_GLOBAL_GAME_COUNT,
  SET_GLOBAL_PLAYER_COUNT,
  CLEAR_STATS,
  SHOW_STATS,
  SHOW_LEADERBOARDS,
  SET_LEADERBOARDS,
} = mutations;

describe('Stats Store', () => {
  let state = {};

  beforeEach(() => {
    state = {
      ...defaultState(),
    };
  });

  it('SET_GLOBAL_STATS', () => {
    SET_GLOBAL_STATS(state, mockStats);

    expect(state.globalStats).toEqual(mockStats);
  });

  it('SET_USER_STATS', () => {
    SET_USER_STATS(state, mockStats);

    expect(state.userStats).toEqual(mockStats);
  });

  it('SET_USER_GAME_COUNT', () => {
    SET_USER_GAME_COUNT(state, mockStats);

    expect(state.userGameCount).toEqual(mockStats.completed);
  });

  it('SET_GLOBAL_GAME_COUNT', () => {
    SET_GLOBAL_GAME_COUNT(state, mockStats);

    expect(state.globalGameCount).toEqual(mockStats.completed);
  });

  it('SET_GLOBAL_PLAYER_COUNT', () => {
    SET_GLOBAL_PLAYER_COUNT(state, mockStats);

    expect(state.playerCount).toEqual(mockStats.players);
  });

  it('CLEAR_STATS', () => {
    CLEAR_STATS(state);

    expect(state.userStats).toEqual({});
    expect(state.globalStats).toEqual({});
  });

  it('SHOW_STATS', () => {
    SHOW_STATS(state, true);

    expect(state.showStats).toEqual(true);
  });

  it('SHOW_LEADERBOARDS', () => {
    SHOW_LEADERBOARDS(state, true);

    expect(state.showLeaderboards).toEqual(true);
  });

  it('SET_LEADERBOARDS', () => {
    SET_LEADERBOARDS(state, mockLeaderboardsMoves);

    expect(state.leaderboards).toEqual(mockLeaderboardsMoves);
  });
});
