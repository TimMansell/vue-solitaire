import { mockBoard } from '@/mockData';
import actions from '../actions';

const { moveCardsToColumn, moveCardToFoundation, setDraggedCards } = actions;

vi.mock('@/services/solitaire');
vi.mock('@/services/ws');

describe('Solitaire Store', () => {
  let commit;
  let dispatch;

  beforeEach(() => {
    commit = vi.fn();
    dispatch = vi.fn();
  });

  it('should move cards to column', () => {
    const state = { selectedCardId: 1, validMove: true };

    moveCardsToColumn({ dispatch, state }, 0);

    expect(dispatch).toHaveBeenCalledWith('saveMove', {
      isBoard: true,
      selectedColumn: 0,
    });
    expect(dispatch).toHaveBeenCalledWith('setBoard', []);
    expect(dispatch).toHaveBeenCalledWith('checkGameState');
  });

  it('should not move cards to column when invalid move', () => {
    const state = { selectedCardId: 1, validMove: false };

    moveCardsToColumn({ dispatch, state });

    expect(dispatch).not.toHaveBeenCalledWith('setBoard');
  });

  it('should not move cards to column when selectedCardId is 0', () => {
    const state = { selectedCardId: 0 };

    moveCardsToColumn({ dispatch, state });

    expect(dispatch).not.toHaveBeenCalledWith('setBoard');
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
