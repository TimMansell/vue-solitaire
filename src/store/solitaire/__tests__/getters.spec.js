import getters from '../getters';
import defaultState from '../state';

const {
  boardCards,
  foundationCards,
  selectedCardId,
  hasMoves,
  draggedCards,
  draggedCardsIDs,
} = getters;

const state = {
  ...defaultState(),
};

describe('Solitaire Store', () => {
  it('boardCards', () => {
    const result = boardCards(state);

    expect(result).toEqual(state.board.cards);
  });

  it('foundationCards', () => {
    const result = foundationCards(state);

    expect(result).toEqual(state.board.foundation);
  });

  it('selectedCardId', () => {
    const result = selectedCardId(state);

    expect(result).toEqual(state.selectedCardId);
  });

  it('hasMoves', () => {
    const result = hasMoves(state);

    expect(result).toEqual(state.hasMoves);
  });

  it('draggedCards', () => {
    const result = draggedCards(state);

    expect(result).toEqual(state.draggedCards);
  });

  it('draggedCardsIDs', () => {
    const newState = {
      ...state,
      draggedCards: [{ id: 5 }, { id: 10 }],
    };
    const result = draggedCardsIDs(newState);

    expect(result).toEqual([5, 10]);
  });
});
