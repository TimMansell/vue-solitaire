import {
  loadFoundation,
  updateFoundation,
  getEmptyFoundationColumn,
} from '../index';

describe('foundation', () => {
  describe('load foundation', () => {
    it('should return foundations', () => {
      const board = {
        foundation: [[], []],
        cards: [[], []],
      };

      const result = loadFoundation(board);

      expect(result).toStrictEqual([[], []]);
    });
  });

  it('should update foundation', () => {
    const state = {
      foundationCards: [[], [], [], []],
    };

    const cards = {
      foundationCardsTo: {
        cards: [
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
      boardCards: [
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
      foundationCards: [[], [], [], []],
      selectedCardId: 1,
    };

    const result = getEmptyFoundationColumn(state);

    expect(result).toBe(0);
  });

  it('should return second column', () => {
    const state = {
      boardCards: [
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
      foundationCards: [
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
      boardCards: [
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
      foundationCards: [
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
