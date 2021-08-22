import {
  initFoundation,
  updateFoundation,
  getEmptyFoundationColumn,
} from '../index';

describe('foundation', () => {
  it('should init foundation', () => {
    const result = initFoundation();

    expect(result).toStrictEqual([[], [], [], []]);
  });

  it('should update foundation', () => {
    const state = {
      foundation: [[], [], [], []],
    };

    const cards = {
      cardsTo: {
        columnCards: [
          {
            id: 2,
            suit: '♠',
            value: 'A',
          },
        ],
        columnNo: 2,
      },
    };

    const result = updateFoundation(state, cards);

    expect(result).toStrictEqual([
      [],
      [],
      [{ id: 2, suit: '♠', value: 'A' }],
      [],
    ]);
  });

  it('should return first empty Ace column', () => {
    const state = {
      cards: [
        [
          {
            id: 1,
            suit: '♠',
            value: 'A',
          },
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
      ],
      foundation: [[], [], [], []],
      selectedCardId: 1,
    };

    const result = getEmptyFoundationColumn(state);

    expect(result).toBe(0);
  });

  it('should return second column', () => {
    const state = {
      cards: [
        [
          {
            id: 1,
            suit: '♠',
            value: 'A',
          },
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
      ],
      foundation: [
        [
          {
            id: 2,
            suit: '♦',
            value: 'A',
          },
        ],
        [],
        [],
        [],
      ],
      selectedCardId: 1,
    };

    const result = getEmptyFoundationColumn(state);

    expect(result).toBe(1);
  });

  it('should return correct column for suit', () => {
    const state = {
      cards: [
        [
          {
            id: 1,
            suit: '♠',
            order: 2,
            value: 2,
          },
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
      ],
      foundation: [
        [
          {
            id: 2,
            suit: '♠',
            order: 1,
            value: 'A',
          },
        ],
        [],
        [],
        [],
      ],
      selectedCardId: 1,
    };

    const result = getEmptyFoundationColumn(state);

    expect(result).toBe(0);
  });
});
