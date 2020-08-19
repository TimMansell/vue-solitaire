import actions from '../actions';

const {
  restartGame,
  setGame,
  checkGameState,
  setFoundations,
  setBoard,
  setCard,
  moveCardsToColumn,
  moveCardToFoundation,
  autoMoveCardToFoundation,
} = actions;

const commit = jest.fn();
const dispatch = jest.fn();

jest.mock('@/services/solitaire', () => ({
  isEmptyBoard: () => true,
  getFoundationCards: () => [],
  getBoardCards: () => [],
  hasMoves: () => false,
  setSelectedCard: () => 1,
  findEmptyFoundationColumn: () => 0,
  isValidCardMove: () => true,
  moveCards: () => jest.fn(),
  isValidFoundationMove: () => true,
  moveCardsToFoundation: () => jest.fn(),
  setBoard: () => jest.fn(),
  setFoundation: () => jest.fn(),
}));

describe('Solitaire Store', () => {
  it('restartGame', () => {
    const state = {
      game: {
        id: 1,
        moves: 10,
      },
    };

    restartGame({ commit, dispatch, state }, false);

    expect(dispatch).toHaveBeenCalledWith('db/completedGame', state.game);
    expect(commit).toHaveBeenCalledWith('RESTART_GAME');
  });

  it('setGame', () => {
    const id = 10;

    setGame({ commit }, id);

    expect(commit).toHaveBeenCalledWith('SET_GAME', { id });
  });

  it('checkGameState', () => {
    const state = {
      game: {
        id: 1,
        moves: 10,
      },
    };

    checkGameState({ commit, dispatch, state });

    expect(commit).toHaveBeenCalledWith('SET_GAME_WON', true);
    expect(commit).toHaveBeenCalledWith('SET_GAME_LOST', false);
    expect(dispatch).toHaveBeenCalledWith('db/wonGame', state.game);
  });

  it('setFoundations', () => {
    setFoundations({ commit });

    expect(commit).toHaveBeenCalledWith('SET_FOUNDATIONS', []);
  });

  it('setBoard', () => {
    setBoard({ commit });

    expect(commit).toHaveBeenCalledWith('SET_BOARD', []);
  });

  it('setCard - select', () => {
    const state = {
      selectedCard: 2,
    };

    setCard({ commit, state }, 1);

    expect(commit).toHaveBeenCalledWith('SELECT_CARD', 1);
  });

  it('setCard - unselect', () => {
    const state = {
      selectedCard: 1,
    };

    setCard({ commit, state, dispatch }, 1);

    expect(dispatch).toHaveBeenCalledWith('unselectCard');
  });

  it('moveCardsToColumn', () => {
    moveCardsToColumn({ commit, dispatch });

    expect(dispatch).toHaveBeenCalledWith('setBoard');
    expect(dispatch).toHaveBeenCalledWith('checkGameState');
    expect(dispatch).toHaveBeenCalledWith('unselectCard');
    expect(commit).toHaveBeenCalledWith('INCREMENT_MOVES');
  });

  it('moveCardToFoundation', () => {
    moveCardToFoundation({ commit, dispatch });

    expect(dispatch).toHaveBeenCalledWith('setBoard');
    expect(dispatch).toHaveBeenCalledWith('setFoundations');
    expect(dispatch).toHaveBeenCalledWith('checkGameState');
    expect(dispatch).toHaveBeenCalledWith('unselectCard');
    expect(commit).toHaveBeenCalledWith('INCREMENT_MOVES');
  });

  it('autoMoveCardToFoundation', () => {
    autoMoveCardToFoundation({ dispatch });

    expect(dispatch).toHaveBeenCalledWith('moveCardToFoundation', 0);
  });
});
