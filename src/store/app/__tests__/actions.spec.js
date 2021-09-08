import { mockVersionNumber } from '@/mockData';
import actions from '../actions';

const {
  checkAppVersion,
  setGameInactive,
  toggleGamePaused,
  setTimerPaused,
  toggleRules,
  toggleNewGame,
} = actions;

jest.mock('@/services/db');

describe('App Store', () => {
  let commit;

  beforeEach(() => {
    commit = jest.fn();
  });

  it('checkAppVersion - same version', async () => {
    await checkAppVersion({ commit }, mockVersionNumber);

    expect(commit).toHaveBeenCalledWith('SET_VERSION_MATCH', true);
  });

  it('checkAppVersion - different versions', async () => {
    const version = '0.0.1';

    await checkAppVersion({ commit }, version);

    expect(commit).toHaveBeenCalledWith('SET_VERSION_MATCH', false);
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
