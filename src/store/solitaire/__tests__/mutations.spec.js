import mutations from '../mutations';
import defaultState from '../state';

const {
  RESTART_GAME,
  SET_GAME,
  SET_GAME_WON,
  SET_GAME_LOST,
  SET_GAME_PAUSED,
  SET_BOARD,
  SET_FOUNDATIONS,
  SELECT_CARD,
  UNSELECT_CARD,
  SET_HAS_MOVES,
  INCREMENT_MOVES,
  UPDATE_GAME_TIME,
  SHOW_RULES,
  SHOW_NEW_GAME,
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
      isGamePaused: {
        isPaused: true,
        isActive: true,
        showMsg: true,
      },
      hasMoves: false,
      game: {
        id: null,
        moves: 0,
        time: 0,
      },
      showRules: false,
      showNewGame: false,
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
      time: 0,
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

  it('SET_GAME_PAUSED', () => {
    const paused = {
      isPaused: true,
      isActive: true,
      showMsg: true,
    };

    SET_GAME_PAUSED(state, paused);

    expect(state.isGamePaused).toEqual(paused);
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

  it('UPDATE_GAME_TIME', () => {
    UPDATE_GAME_TIME(state);

    expect(state.game.time).toEqual(1);
  });

  it('SHOW_RULES', () => {
    SHOW_RULES(state, true);

    expect(state.showRules).toEqual(true);
  });

  it('SHOW_NEW_GAME', () => {
    SHOW_NEW_GAME(state, true);

    expect(state.showNewGame).toEqual(true);
  });
});
