import mutations from '../mutations';

const {
  RESTART_GAME,
  SET_GAME_WON,
  SET_BOARD,
  SET_FOUNDATIONS,
  SELECT_CARD,
  UNSELECT_CARD,
  SET_REMAINING_MOVES,
} = mutations;

describe('Solitaire Store', () => {
  let state = {};

  beforeEach(() => {
    state = {
      board: {
        cards: [],
        foundation: [],
      },
      selectedCardId: 1,
      isGameWon: true,
      hasMoves: false,
    };
  });

  it('RESTART_GAME', () => {
    RESTART_GAME(state);

    expect(state).toEqual(state);
  });

  it('SET_GAME_WON', () => {
    SET_GAME_WON(state, true);

    expect(state.isGameWon).toEqual(true);
  });

  it('SET_BOARD', () => {
    const deck = [{}];

    SET_BOARD(state, deck);

    expect(state.board.cards).toEqual(deck);
  });

  it('SET_FOUNDATIONS', () => {
    const foundation = [{}];

    SET_FOUNDATIONS(state, foundation);

    expect(state.board.foundation).toEqual(foundation);
  });

  it('SELECT_CARD', () => {
    SELECT_CARD(state, 2);

    expect(state.selectedCardId).toEqual(2);
  });

  it('UNSELECT_CARD', () => {
    UNSELECT_CARD(state);

    expect(state.selectedCardId).toEqual(null);
  });

  it('SET_REMAINING_MOVES', () => {
    SET_REMAINING_MOVES(state, true);

    expect(state.hasMoves).toEqual(true);
  });
});
