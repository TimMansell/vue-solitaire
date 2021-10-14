import { mockBoard } from '@/mockData';
import actions from '../actions';

const {
  checkGameState,
  moveCardsToColumn,
  moveCardToFoundation,
  setDraggedCards,
} = actions;

jest.mock('@/services/solitaire');
jest.mock('@/services/ws');

describe('Solitaire Store', () => {
  let commit;
  let dispatch;

  beforeEach(() => {
    commit = jest.fn();
    dispatch = jest.fn();
  });

  it('should have no moves for game state', () => {
    const state = { hasMoves: false };

    checkGameState({ dispatch, state });

    expect(dispatch).toHaveBeenCalledWith('setGameOutcome', true);
  });

  it('should have moves for game state', () => {
    const state = { hasMoves: true };

    checkGameState({ dispatch, state });

    expect(dispatch).not.toHaveBeenCalledWith('setGameOutcome');
  });

  it('should move cards to column', () => {
    const state = { validMove: true };

    moveCardsToColumn({ dispatch, state }, 0);

    expect(dispatch).toHaveBeenCalledWith('saveMove', {
      isBoard: true,
      selectedColumn: 0,
    });
    expect(dispatch).toHaveBeenCalledWith('setBoard', []);
    expect(dispatch).toHaveBeenCalledWith('checkGameState');
  });

  it('should not move cards to column', () => {
    const state = { validMove: false };

    moveCardsToColumn({ dispatch, state });

    expect(dispatch).not.toHaveBeenCalledWith('setBoard');
    expect(dispatch).toHaveBeenCalledWith('setCard', null);
  });

  it('should move cards to foundation', () => {
    const state = { validMove: true };

    moveCardToFoundation({ dispatch, state }, 1);

    expect(dispatch).toHaveBeenCalledWith('saveMove', {
      isFoundation: true,
      selectedColumn: 1,
    });
    expect(dispatch).toHaveBeenCalledWith('setFoundation', []);
    expect(dispatch).toHaveBeenCalledWith('setBoard', []);
    expect(dispatch).toHaveBeenCalledWith('checkGameState');
  });

  it('should not move cards to foundation', () => {
    const state = { validMove: false };

    moveCardToFoundation({ dispatch, state });

    expect(dispatch).not.toHaveBeenCalledWith('setFoundation');
    expect(dispatch).not.toHaveBeenCalledWith('setBoard');
  });

  it('setDraggedCards', () => {
    const state = {};

    setDraggedCards({ commit, state }, 1);

    expect(commit).toHaveBeenCalledWith('DRAG_CARDS', mockBoard);
  });
});
