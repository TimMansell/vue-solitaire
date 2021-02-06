import actions from '../actions';

const {
  init,
  restart,
  checkGameState,
  setFoundations,
  setBoard,
  setCard,
  unselectCard,
  moveCardsToColumn,
  moveCardToFoundation,
  autoMoveCardToFoundation,
  setDraggedCards,
  clearDraggedCards,
} = actions;

const commit = jest.fn();
const dispatch = jest.fn();

jest.mock('@/services/solitaire');
jest.mock('@/services/db');
jest.mock('../helpers');

describe('Solitaire Store', () => {
  it('init - new game', () => {
    const state = {
      isNewGame: true,
    };

    init({ dispatch, state }, true);

    expect(dispatch).not.toHaveBeenCalledWith('setCard');
  });

  it('initGame - saved game', () => {
    const state = {
      selectedCardId: 1,
    };

    init({ dispatch, state }, false);

    expect(dispatch).toHaveBeenCalledWith('setCard', 1);
  });

  it('restart', () => {
    restart({ commit });

    expect(commit).toHaveBeenCalledWith('RESTART_GAME');
  });

  it('checkGameState', () => {
    checkGameState({ commit, dispatch });

    dispatch('setGameState', true);
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

  it('unselectCard', () => {
    unselectCard({ commit });

    expect(commit).toHaveBeenCalledWith('UNSELECT_CARD');
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

  it('clearDraggedCards', () => {
    clearDraggedCards({ commit });

    expect(commit).toHaveBeenCalledWith('CLEAR_DRAG_CARDS');
  });
});
