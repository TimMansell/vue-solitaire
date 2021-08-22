import mutations from '../mutations';
import defaultState from '../state';

const {
  RESTART_GAME,
  NEW_GAME,
  SET_BOARD,
  SET_FOUNDATIONS,
  SELECT_CARD,
  UNSELECT_CARD,
  SET_HAS_MOVES,
  DRAG_CARDS,
  CLEAR_DRAG_CARDS,
} = mutations;

describe('Solitaire Store', () => {
  let state = {};

  beforeEach(() => {
    state = {
      ...defaultState(),
    };
  });

  it('RESTART_GAME', () => {
    RESTART_GAME(state);

    expect(state).toEqual(defaultState());
  });

  it('NEW_GAME', () => {
    NEW_GAME(state, false);

    expect(state.isNewGame).toEqual(false);
  });

  it('SET_BOARD', () => {
    const deck = [{}];

    SET_BOARD(state, deck);

    expect(state.cards).toEqual(deck);
  });

  it('SET_FOUNDATIONS', () => {
    const foundation = [{}];

    SET_FOUNDATIONS(state, foundation);

    expect(state.foundation).toEqual(foundation);
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

  it('DRAG_CARDS', () => {
    const cards = [{}];

    DRAG_CARDS(state, cards);

    expect(state.draggedCards).toEqual(cards);
  });

  it('CLEAR_DRAG_CARDS', () => {
    CLEAR_DRAG_CARDS(state);

    expect(state.draggedCards).toEqual([]);
  });
});
