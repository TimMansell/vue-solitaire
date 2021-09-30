import { mockUid, mockBoard, mockFoundation } from '@/mockData';
import actions from '../actions';

const {
  checkGameState,
  initFoundation,
  initBoard,
  moveCardsToColumn,
  moveCardToFoundation,
  setDraggedCards,
} = actions;

jest.mock('@/services/solitaire');
jest.mock('@/services/db');

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

  it('should clear foundations for new game', () => {
    const state = {
      foundation: [],
    };

    initFoundation({ dispatch, state }, true);

    expect(dispatch).toHaveBeenCalledWith('setFoundation', mockFoundation);
  });

  it('should load foundations from state', () => {
    const state = {
      foundation: mockFoundation,
    };

    initFoundation({ dispatch, state }, false);

    expect(dispatch).toHaveBeenCalledWith('setFoundation', mockFoundation);
  });

  it('should set a new board for new game', async () => {
    const state = {
      cards: [],
    };

    const rootState = { user: { luid: mockUid } };

    await initBoard({ dispatch, state, rootState }, true);

    expect(dispatch).toHaveBeenCalledWith('setBoard', mockBoard);
  });

  it('should load board from state', () => {
    const state = {
      cards: mockBoard,
    };

    const rootState = { user: { luid: mockUid } };

    initBoard({ dispatch, state, rootState }, false);

    expect(dispatch).toHaveBeenCalledWith('setBoard', mockBoard);
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
