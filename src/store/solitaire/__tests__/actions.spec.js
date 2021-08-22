import actions from '../actions';

const {
  checkGameState,
  setFoundations,
  setBoard,
  moveCardsToColumn,
  moveCardToFoundation,
  setDraggedCards,
} = actions;

let commit;
let dispatch;

jest.mock('@/services/solitaire');
jest.mock('@/services/db');

describe('Solitaire Store', () => {
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

    expect(commit).toHaveBeenCalledWith('SET_FOUNDATIONS', [
      ['foundation card 1'],
      ['foundation card 2'],
    ]);
  });

  it('should load foundations from state', () => {
    const state = {
      foundation: [['state card 1'], ['state card 2']],
    };

    setFoundations({ commit, state }, false);

    expect(commit).toHaveBeenCalledWith('SET_FOUNDATIONS', state.foundation);
  });

  it('should set a new board for new game', () => {
    const state = {
      cards: [],
    };

    setBoard({ commit, state }, true);

    expect(commit).toHaveBeenCalledWith('SET_BOARD', [['card 1'], ['card 2']]);
  });

  it('should load board from state', () => {
    const state = {
      cards: [['state card 1'], ['state card 2']],
    };

    setBoard({ commit, state }, false);

    expect(commit).toHaveBeenCalledWith('SET_BOARD', state.cards);
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

    expect(commit).toHaveBeenCalledWith('DRAG_CARDS', [['card 1'], ['card 2']]);
  });
});
