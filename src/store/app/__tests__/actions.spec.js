import actions from '../actions';

const {
  restartApp,
  checkAppVersion,
  setGameState,
  setGameInactive,
  toggleGamePaused,
  setTimerPaused,
  toggleRules,
  toggleNewGame,
} = actions;

const mockVersionNumber = '0.0.0';

const commit = jest.fn();
const dispatch = jest.fn();

jest.mock('@/services/db');

describe('App Store', () => {
  it('restartApp', () => {
    restartApp({ dispatch, commit }, false);

    expect(dispatch).toHaveBeenCalledWith('setGameQuit');
  });

  it('checkAppVersion - same version', async () => {
    const state = {
      version: mockVersionNumber,
    };

    await checkAppVersion({ commit, state });

    expect(commit).toHaveBeenCalledWith('SET_VERSION_MATCH', true);
  });

  it('checkAppVersion - different versions', async () => {
    const state = {
      version: '0.0.1',
    };

    await checkAppVersion({ commit, state });

    expect(commit).toHaveBeenCalledWith('SET_VERSION_MATCH', false);
  });

  it('setGameState - game won', () => {
    const hasWon = true;

    setGameState({ commit, dispatch }, hasWon);

    expect(dispatch).toHaveBeenCalledWith('setGameWon');
    expect(commit).toHaveBeenCalledWith('SET_GAME_WON', hasWon);
    expect(commit).toHaveBeenCalledWith('SET_GAME_LOST', !hasWon);
  });

  it('setGameState - game lost', () => {
    const hasWon = false;

    setGameState({ commit, dispatch }, hasWon);

    expect(dispatch).toHaveBeenCalledWith('setGameLost');
    expect(commit).toHaveBeenCalledWith('SET_GAME_WON', hasWon);
    expect(commit).toHaveBeenCalledWith('SET_GAME_LOST', !hasWon);
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
