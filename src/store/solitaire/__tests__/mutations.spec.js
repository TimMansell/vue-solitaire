import mutations from '../mutations';
import defaultState from '../state';

const {
  RESTART_GAME,
  SET_GAME,
  SET_GAME_WON,
  SET_GAME_LOST,
  SET_BOARD,
  SET_FOUNDATIONS,
  SELECT_CARD,
  UNSELECT_CARD,
  SET_HAS_MOVES,
  INCREMENT_MOVES,
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
      isGameWon: false,
      isGameLost: false,
      hasMoves: false,
      game: {
        id: null,
        moves: 0,
      },
    };
  });

  it('RESTART_GAME', () => {
    RESTART_GAME(state);

    expect(state).toEqual(defaultState());
  });

  it('SET_GAME', () => {
    SET_GAME(state, { id: 1 });

    expect(state.game).toEqual({
      id: 1,
      moves: 0,
    });
  });

  it('SET_GAME_WON', () => {
    SET_GAME_WON(state, true);

    expect(state.isGameWon).toEqual(true);
  });

  it('SET_GAME_LOST', () => {
    SET_GAME_LOST(state, true);

    expect(state.isGameLost).toEqual(true);
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

  it('SET_HAS_MOVES', () => {
    SET_HAS_MOVES(state, true);

    expect(state.hasMoves).toEqual(true);
  });

  it('INCREMENT_MOVES', () => {
    INCREMENT_MOVES(state);

    expect(state.game.moves).toEqual(1);
  });
});
