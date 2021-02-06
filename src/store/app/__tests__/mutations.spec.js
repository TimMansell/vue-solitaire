import mutations from '../mutations';
import defaultState from '../state';

const {
  RESTART,
  SET_GAME,
  SET_GAME_WON,
  SET_GAME_LOST,
  SET_GAME_PAUSED,
  SET_TIMER_PAUSED,
  INCREMENT_MOVES,
  UPDATE_GAME_TIME,
  SHOW_RULES,
  SHOW_NEW_GAME,
} = mutations;

describe('Solitaire Store', () => {
  let state = {};

  beforeEach(() => {
    // state = {
    //   isGameWon: false,
    //   isGameLost: false,
    //   isGamePaused: {
    //     isPaused: false,
    //     isActive: false,
    //   },
    //   game: {
    //     id: null,
    //     moves: 0,
    //     time: 0,
    //   },
    //   showRules: false,
    //   showNewGame: false,
    //   isTimerPaused: false,
    // };

    state = {
      ...defaultState(),
    };
  });

  it('RESTART', () => {
    RESTART(state);

    expect(state).toEqual(defaultState());
  });

  it('SET_GAME', () => {
    SET_GAME(state, { id: 1 });

    expect(state.game).toEqual({
      id: 1,
      moves: 0,
      time: 0,
    });
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
});
