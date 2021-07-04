import mutations from '../mutations';
import defaultState from '../state';

const {
  RESTART_APP,
  SET_GAME_WON,
  SET_GAME_LOST,
  SET_GAME_PAUSED,
  SET_TIMER_PAUSED,
  INCREMENT_MOVES,
  UPDATE_GAME_TIME,
  SHOW_RULES,
  SHOW_NEW_GAME,
  SET_VERSION_MATCH,
  SET_OVERLAY_VISIBLE,
} = mutations;

describe('App Store', () => {
  let state = {};

  beforeEach(() => {
    state = {
      ...defaultState(),
    };
  });

  it('RESTART_APP', () => {
    RESTART_APP(state);

    expect(state).toEqual(defaultState());
  });

  it('SET_GAME_WON', () => {
    SET_GAME_WON(state, true);

    expect(state.isGameWon).toEqual(true);
  });

  it('SET_GAME_LOST', () => {
    SET_GAME_LOST(state, true);

    expect(state.isGameLost).toEqual(true);
  });

  it('SET_GAME_PAUSED', () => {
    const paused = {
      isPaused: true,
      isActive: true,
    };

    SET_GAME_PAUSED(state, paused);

    expect(state.isGamePaused).toEqual(paused);
  });

  it('SET_TIMER_PAUSED', () => {
    SET_TIMER_PAUSED(state, true);

    expect(state.isTimerPaused).toEqual(true);
  });

  it('INCREMENT_MOVES', () => {
    INCREMENT_MOVES(state);

    expect(state.game.moves).toEqual(1);
  });

  it('UPDATE_GAME_TIME', () => {
    UPDATE_GAME_TIME(state);

    expect(state.game.time).toEqual(1);
  });

  it('SHOW_RULES', () => {
    SHOW_RULES(state, true);

    expect(state.showRules).toEqual(true);
  });

  it('SHOW_NEW_GAME', () => {
    SHOW_NEW_GAME(state, true);

    expect(state.showNewGame).toEqual(true);
  });

  it('SET_VERSION_MATCH', () => {
    SET_VERSION_MATCH(state, false);

    expect(state.versionMatch).toEqual(false);
  });

  it('SET_OVERLAY_VISIBLE', () => {
    SET_OVERLAY_VISIBLE(state, false);

    expect(state.isOverlayVisible).toEqual(false);
  });
});
