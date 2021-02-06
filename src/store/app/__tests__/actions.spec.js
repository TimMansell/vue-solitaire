import actions from '../actions';

const {
  initGame,
  restartGame,
  trackNewGame,
  setGameInactive,
  toggleGamePaused,
  setTimerPaused,
  toggleRules,
  toggleNewGame,
} = actions;

const commit = jest.fn();
const dispatch = jest.fn();

jest.mock('@/services/db');

describe('Solitaire Store', () => {
  it('initGame - new game', () => {
    const state = {
      isNewGame: true,
    };

    initGame({ commit, dispatch, state });

    expect(dispatch).toHaveBeenCalledWith('init', true);
    expect(dispatch).toHaveBeenCalledWith('newGame', true);
  });

  it('initGame - saved game', () => {
    const state = {
      isNewGame: false,
    };

    initGame({ commit, dispatch, state });

    expect(dispatch).toHaveBeenCalledWith('init', false);
    expect(dispatch).not.toHaveBeenCalledWith('newGame');
  });

  it('restartGame', () => {
    const state = {
      game: {
        id: 1,
        moves: 10,
      },
    };

    restartGame({ dispatch, commit, state }, false);

    expect(commit).toHaveBeenCalledWith('RESTART');
  });

  it('trackNewGame', async () => {
    const rootState = {
      user: {
        suid: 123,
      },
    };

    const mockResponse = {
      _id: 123,
    };

    await trackNewGame({ commit, dispatch, rootState });

    // eslint-disable-next-line no-underscore-dangle
    expect(commit).toHaveBeenCalledWith('SET_GAME', { id: mockResponse._id });
  });

  it('setGameInactive', () => {
    const isGamePaused = {
      isPaused: true,
      isActive: false,
    };

    setGameInactive({ commit }, isGamePaused);

    expect(commit).toHaveBeenCalledWith('SET_GAME_PAUSED', isGamePaused);
  });

  it('toggleGamePaused', () => {
    const state = {
      isGamePaused: {
        isPaused: false,
        isActive: false,
      },
    };

    const result = {
      isPaused: true,
      isActive: true,
    };

    toggleGamePaused({ commit, state });

    expect(commit).toHaveBeenCalledWith('SET_GAME_PAUSED', result);
  });

  it('setTimerPaused', () => {
    setTimerPaused({ commit }, true);

    expect(commit).toHaveBeenCalledWith('SET_TIMER_PAUSED', true);
  });

  it('toggleRules', () => {
    const state = {
      showRules: false,
    };

    toggleRules({ commit, state });

    expect(commit).toHaveBeenCalledWith('SHOW_RULES', true);
  });

  it('toggleNewGame', () => {
    const state = {
      showNewGame: false,
    };

    toggleNewGame({ commit, state });

    expect(commit).toHaveBeenCalledWith('SHOW_NEW_GAME', true);
  });
});
