import { mockVersionNumber } from '@/mockData';
import actions from '../actions';

const {
  checkAppVersion,
  setNewGame,
  setGameState,
  setGameResult,
  setGameInactive,
  toggleGamePaused,
  setTimerPaused,
  toggleRules,
  toggleNewGame,
} = actions;

const commit = jest.fn();
const dispatch = jest.fn();

jest.mock('@/services/db');

describe('App Store', () => {
  it('checkAppVersion - same version', async () => {
    await checkAppVersion({ commit }, mockVersionNumber);

    expect(commit).toHaveBeenCalledWith('SET_VERSION_MATCH', true);
  });

  it('checkAppVersion - different versions', async () => {
    const version = '0.0.1';

    await checkAppVersion({ commit }, version);

    expect(commit).toHaveBeenCalledWith('SET_VERSION_MATCH', false);
  });

  it('setNewGame - should run quit game', () => {
    const isCompleted = false;

    setNewGame({ dispatch }, isCompleted);

    expect(dispatch).toHaveBeenCalledWith('setGameResult', { quit: true });
  });

  it('setNewGame - show not run quit game', () => {
    const isCompleted = true;

    setNewGame({ dispatch }, isCompleted);

    expect(dispatch).not.toHaveBeenCalledWith('setGameResult');
  });

  it('setGameState - game won', () => {
    const hasWon = true;

    setGameState({ commit, dispatch }, hasWon);

    expect(dispatch).toHaveBeenCalledWith('setGameResult', { won: true });
    expect(commit).toHaveBeenCalledWith('SET_GAME_WON', hasWon);
    expect(commit).toHaveBeenCalledWith('SET_GAME_LOST', !hasWon);
  });

  it('setGameState - game lost', () => {
    const hasWon = false;

    setGameState({ commit, dispatch }, hasWon);

    expect(dispatch).toHaveBeenCalledWith('setGameResult', { lost: true });
    expect(commit).toHaveBeenCalledWith('SET_GAME_WON', hasWon);
    expect(commit).toHaveBeenCalledWith('SET_GAME_LOST', !hasWon);
  });

  it('setGameResult', async () => {
    const gameState = { won: true };

    await setGameResult({ dispatch }, gameState);

    expect(dispatch).toHaveBeenCalledWith('getStatsCount');
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
