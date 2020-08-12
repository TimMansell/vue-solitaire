import actions from '../actions';

const {
  checkGameWon,
  setFoundations,
  setBoard,
  setCard,
  checkRemainingMoves,
  moveCardsToColumn,
  moveCardToFoundation,
  autoMoveCardToFoundation,
} = actions;

jest.mock('@/services/solitaire', () => ({
  isEmptyBoard: () => true,
  getFoundationCards: () => [],
  getBoardCards: () => [],
  hasMoves: () => true,
  setSelectedCard: () => 1,
  findEmptyFoundationColumn: () => 0,
  isValidCardMove: () => true,
  moveCards: () => jest.fn(),
  isValidFoundationMove: () => true,
  moveCardsToFoundation: () => jest.fn(),
}));

describe('Solitaire Store', () => {
  let commit;
  let dispatch;

  beforeEach(() => {
    commit = jest.fn();
    dispatch = jest.fn();
  });

  it('checkGameWon', () => {
    checkGameWon({ commit });

    expect(commit).toHaveBeenCalledWith('SET_GAME_WON', true);
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

  it('checkRemainingMoves', () => {
    checkRemainingMoves({ commit });

    expect(commit).toHaveBeenCalledWith('SET_REMAINING_MOVES', true);
  });

  it('moveCardsToColumn', () => {
    moveCardsToColumn({ dispatch });

    expect(dispatch).toHaveBeenCalledWith('setBoard');
  });

  it('moveCardToFoundation', () => {
    moveCardToFoundation({ dispatch });

    expect(dispatch).toHaveBeenCalledWith('setBoard');
  });

  it('autoMoveCardToFoundation', () => {
    autoMoveCardToFoundation({ dispatch });

    expect(dispatch).toHaveBeenCalledWith('moveCardToFoundation', 0);
  });
});
