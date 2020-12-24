import getters from '../getters';

const {
  boardCards,
  foundationCards,
  selectedCardId,
  isGameWon,
  isGameLost,
  isGamePaused,
  hasMoves,
  timer,
  showRules,
  showNewGame,
  draggedCards,
} = getters;

const state = {
  board: {
    cards: [],
    foundation: [],
  },
  selectedCardId: 1,
  isGameWon: true,
  isGameLost: true,
  isGamePaused: {
    isPaused: true,
    isActive: true,
    showMsg: true,
  },
  hasMoves: false,
  game: {
    time: 0,
  },
  showRules: false,
  showNewGame: false,
  draggedCards: [],
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

  it('isGamePaused', () => {
    const result = isGamePaused(state);

    expect(result).toEqual(state.isGamePaused);
  });

  it('hasMoves', () => {
    const result = hasMoves(state);

    expect(result).toEqual(state.hasMoves);
  });

  it('timer', () => {
    const result = timer(state);

    expect(result).toEqual(state.game.time);
  });

  it('showRules', () => {
    const result = showRules(state);

    expect(result).toEqual(state.showRules);
  });

  it('showNewGame', () => {
    const result = showNewGame(state);

    expect(result).toEqual(state.showNewGame);
  });

  it('draggedCards', () => {
    const result = draggedCards(state);

    expect(result).toEqual(state.draggedCards);
  });
});
