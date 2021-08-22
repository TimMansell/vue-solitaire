import getters from '../getters';
import defaultState from '../state';

const {
  cards,
  foundation,
  selectedCardId,
  hasMoves,
  draggedCards,
  draggedCardsIDs,
} = getters;

const state = {
  ...defaultState(),
};

describe('Solitaire Store', () => {
  it('cards', () => {
    const result = cards(state);

    expect(result).toEqual(state.cards);
  });

  it('foundation', () => {
    const result = foundation(state);

    expect(result).toEqual(state.foundation);
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
