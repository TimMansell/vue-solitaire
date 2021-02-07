import actions from '../actions';

const {
  init,
  restart,
  create,
  setGameState,
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
  it('init - new game', () => {
    const state = {
      isNewGame: true,
    };

    init({ commit, dispatch, state });

    expect(dispatch).toHaveBeenCalledWith('initGame', true);
    expect(dispatch).toHaveBeenCalledWith('create', true);
  });

  it('init - saved game', () => {
    const state = {
      isNewGame: false,
    };

    init({ commit, dispatch, state });

    expect(dispatch).toHaveBeenCalledWith('initGame', false);
    expect(dispatch).not.toHaveBeenCalledWith('create');
  });

  it('restart', () => {
    const state = {
      game: {
        id: 1,
        moves: 10,
      },
    };

    restart({ dispatch, commit, state }, false);

    expect(commit).toHaveBeenCalledWith('RESTART');
  });

  it('create(', async () => {
    const rootState = {
      user: {
        suid: 123,
      },
    };

    const mockResponse = {
      _id: 123,
    };

    await create({ commit, dispatch, rootState });

    // eslint-disable-next-line no-underscore-dangle
    expect(commit).toHaveBeenCalledWith('SET_GAME', { id: mockResponse._id });
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
