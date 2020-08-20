import getters from '../getters';

const { boardCards, foundationCards, selectedCardId, isGameWon, isGameLost, hasMoves } = getters;

const state = {
  board: {
    cards: [],
    foundation: [],
  },
  selectedCardId: 1,
  isGameWon: true,
  hasMoves: false,
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

  it('isGameLost', () => {
    const result = isGameLost(state);

    expect(result).toEqual(state.isGameLost);
  });

  it('isGameWon', () => {
    const result = isGameWon(state);

    expect(result).toEqual(state.isGameWon);
  });

  it('hasMoves', () => {
    const result = hasMoves(state);

    expect(result).toEqual(state.hasMoves);
  });
});
