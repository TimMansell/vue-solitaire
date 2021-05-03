import actions from '../actions';

const {
  initGame,
  checkGameState,
  setFoundations,
  setBoard,
  setCard,
  moveCardsToColumn,
  moveCardToFoundation,
  autoMoveCardToFoundation,
  setDraggedCards,
} = actions;

const commit = jest.fn();
const dispatch = jest.fn();

jest.mock('@/services/solitaire');
jest.mock('@/services/db');
jest.mock('../helpers');

describe('Solitaire Store', () => {
  it('initGame - new game', () => {
    const state = {
      isNewGame: true,
    };

    initGame({ dispatch, state });

    expect(dispatch).not.toHaveBeenCalledWith('setCard');
    expect(dispatch).toHaveBeenCalledWith('newGame', false);
  });

  it('initGame - saved game', () => {
    const state = {
      selectedCardId: 1,
      isNewGame: false,
    };

    initGame({ dispatch, state });

    expect(dispatch).toHaveBeenCalledWith('setCard', 1);
    expect(dispatch).not.toHaveBeenCalledWith('newGame');
  });

  it('checkGameState - no moves', () => {
    checkGameState({ commit, dispatch });

    expect(dispatch).toHaveBeenCalledWith('setGameState', true);
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

    setCard({ dispatch, state }, 1);

    expect(dispatch).toHaveBeenCalledWith('selectCard', 1);
  });

  it('setCard - unselect', () => {
    const state = {
      selectedCard: 1,
    };

    setCard({ dispatch, state }, 1);

    expect(dispatch).toHaveBeenCalledWith('unselectCard');
  });

  it('moveCardsToColumn', () => {
    moveCardsToColumn({ dispatch });

    expect(dispatch).toHaveBeenCalledWith('incrementMoves');
    expect(dispatch).toHaveBeenCalledWith('setBoard');
    expect(dispatch).toHaveBeenCalledWith('checkGameState');
    expect(dispatch).toHaveBeenCalledWith('unselectCard');
  });

  it('moveCardToFoundation', () => {
    moveCardToFoundation({ dispatch });

    expect(dispatch).toHaveBeenCalledWith('incrementMoves');
    expect(dispatch).toHaveBeenCalledWith('setBoard');
    expect(dispatch).toHaveBeenCalledWith('setFoundations');
    expect(dispatch).toHaveBeenCalledWith('checkGameState');
    expect(dispatch).toHaveBeenCalledWith('unselectCard');
  });

  it('autoMoveCardToFoundation', () => {
    autoMoveCardToFoundation({ dispatch });

    expect(dispatch).toHaveBeenCalledWith('moveCardToFoundation', 0);
  });

  it('setDraggedCards', () => {
    setDraggedCards({ commit }, 1);

    expect(commit).toHaveBeenCalledWith('DRAG_CARDS', []);
  });
});
