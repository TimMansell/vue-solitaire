import { mockUid, mockBoard, mockFoundation } from '@/mockData';
import actions from '../actions';

const {
  checkGameState,
  setFoundations,
  setBoard,
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

    checkGameState({ commit, dispatch, state });

    expect(dispatch).toHaveBeenCalledWith('setGameState', true);
  });

  it('should have moves for game state', () => {
    const state = { hasMoves: true };

    checkGameState({ commit, dispatch, state });

    expect(dispatch).not.toHaveBeenCalledWith('setGameState');
  });

  it('should clear foundations for new game', () => {
    const state = {
      foundation: [],
    };

    setFoundations({ commit, state }, true);

    expect(commit).toHaveBeenCalledWith('SET_FOUNDATIONS', mockFoundation);
  });

  it('should load foundations from state', () => {
    const state = {
      foundation: mockFoundation,
    };

    setFoundations({ commit, state }, false);

    expect(commit).toHaveBeenCalledWith('SET_FOUNDATIONS', mockFoundation);
  });

  it('should set a new board for new game', async () => {
    const state = {
      cards: [],
    };

    const rootState = { user: { luid: mockUid } };

    await setBoard({ commit, state, rootState }, true);

    expect(commit).toHaveBeenCalledWith('SET_BOARD', mockBoard);
  });

  it('should load board from state', () => {
    const state = {
      cards: mockBoard,
    };

    const rootState = { user: { luid: mockUid } };

    setBoard({ commit, state, rootState }, false);

    expect(commit).toHaveBeenCalledWith('SET_BOARD', mockBoard);
  });

  it('should move cards to column', () => {
    const state = { validMove: true };

    moveCardsToColumn({ commit, dispatch, state });

    expect(commit).toHaveBeenCalledWith('SET_BOARD', []);
    expect(dispatch).toHaveBeenCalledWith('incrementMoves');
    expect(dispatch).toHaveBeenCalledWith('checkGameState');
  });

  it('should not move cards to column', () => {
    const state = { validMove: false };

    moveCardsToColumn({ commit, dispatch, state });

    expect(commit).not.toHaveBeenCalledWith('SET_BOARD');
    expect(dispatch).toHaveBeenCalledWith('setCard', null);
  });

  it('should move cards to foundation', () => {
    const state = { validMove: true };

    moveCardToFoundation({ commit, dispatch, state });

    expect(commit).toHaveBeenCalledWith('SET_FOUNDATIONS', []);
    expect(commit).toHaveBeenCalledWith('SET_BOARD', []);

    expect(dispatch).toHaveBeenCalledWith('incrementMoves');
    expect(dispatch).toHaveBeenCalledWith('checkGameState');
  });

  it('should not move cards to foundation', () => {
    const state = { validMove: false };

    moveCardToFoundation({ commit, dispatch, state });

    expect(commit).not.toHaveBeenCalledWith('SET_FOUNDATIONS');
    expect(commit).not.toHaveBeenCalledWith('SET_BOARD');
  });

  it('setDraggedCards', () => {
    const state = {};

    setDraggedCards({ commit, state }, 1);

    expect(commit).toHaveBeenCalledWith('DRAG_CARDS', mockBoard);
  });
});
