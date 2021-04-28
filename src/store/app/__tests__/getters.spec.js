import getters from '../getters';
import defaultState from '../state';

const {
  isGameWon,
  isGameLost,
  isGamePaused,
  isGameActive,
  isTimerPaused,
  timer,
  showRules,
  showNewGame,
} = getters;

const state = {
  ...defaultState(),
};

describe('App Store', () => {
  it('isGameLost', () => {
    const result = isGameLost(state);

    expect(result).toEqual(state.isGameLost);
  });

  it('isGameWon', () => {
    const result = isGameWon(state);

    expect(result).toEqual(state.isGameWon);
  });

  it('isGamePaused', () => {
    const result = isGamePaused(state);

    expect(result).toEqual(state.isGamePaused.isPaused);
  });

  it('isGameActive', () => {
    const result = isGameActive(state);

    expect(result).toEqual(state.isGamePaused.isActive);
  });

  it('isTimerPaused', () => {
    const result = isTimerPaused(state);

    expect(result).toEqual(state.isTimerPaused);
  });

  it('timer', () => {
    const result = timer(state);

    expect(result).toEqual(state.game.time);
  });

  it('showRules', () => {
    const result = showRules(state);

    expect(result).toEqual(state.showRules);
  });

  it('showNewGame', () => {
    const result = showNewGame(state);

    expect(result).toEqual(state.showNewGame);
  });
});
