import {
  initCards,
  getSelectedCard,
  getCardPosition,
  getVisibleCards,
  getLastCard,
  getLastCards,
  showLastCard,
  checkCardValue,
  checkCardTopPosition,
  getColumnCards,
} from '../index';

describe('cards', () => {
  it('should return shuffled deck', () => {
    const deck = initCards();

    expect(deck).toHaveLength(52);
  });

  it('should return selected card', () => {
    const cards = [
      [
        {
          id: 1,
          suit: '♠',
          value: 'A',
        },
      ],
      [
        {
          id: 2,
          suit: '♠',
          value: 2,
        },
        {
          id: 3,
          suit: '♠',
          value: 3,
        },
        {
          id: 3,
          suit: '♠',
          value: 4,
        },
      ],
    ];
    const selectedCardId = 2;

    const result = getSelectedCard(cards, selectedCardId);

    expect(result).toStrictEqual({
      id: 2,
      suit: '♠',
      value: 2,
    });
  });

  it('should return selected card position', () => {
    const cards = [
      [
        {
          id: 1,
          suit: '♠',
          value: 'A',
        },
      ],
      [
        {
          id: 2,
          suit: '♠',
          value: 2,
        },
        {
          id: 3,
          suit: '♠',
          value: 3,
        },
        {
          id: 3,
          suit: '♠',
          value: 4,
        },
      ],
    ];
    const selectedCardId = 2;

    const result = getCardPosition(cards, selectedCardId);

    expect(result).toStrictEqual({
      cardPosition: 0,
      columnNo: 1,
    });
  });

  it('should return all visible cards', () => {
    const cards = [
      [
        {
          id: 1,
          suit: '♠',
          value: 'A',
          visible: true,
        },
      ],
      [
        {
          id: 2,
          suit: '♠',
          value: 2,
        },
        {
          id: 3,
          suit: '♠',
          value: 3,
        },
        {
          id: 4,
          suit: '♠',
          value: 4,
          visible: true,
        },
      ],
    ];

    const result = getVisibleCards(cards);

    expect(result).toStrictEqual([
      { id: 1, suit: '♠', value: 'A', visible: true },
      { id: 4, suit: '♠', value: 4, visible: true },
    ]);
  });

  it('should return last card in second column', () => {
    const cards = [
      [
        {
          id: 1,
          suit: '♠',
          value: 'A',
          visble: true,
        },
      ],
      [
        {
          id: 2,
          suit: '♠',
          value: 2,
        },
        {
          id: 3,
          suit: '♠',
          value: 3,
        },
        {
          id: 4,
          suit: '♠',
          value: 4,
          visible: true,
        },
      ],
      [
        {
          id: 5,
          suit: '♦',
          value: 'A',
          visble: true,
        },
      ],
    ];

    const selectedColumn = 1;

    const result = getLastCard(cards, selectedColumn);

    expect(result).toStrictEqual({
      id: 4,
      suit: '♠',
      value: 4,
      visible: true,
    });
  });

  it('should emtpy last card object for a selected empty column', () => {
    const cards = [
      [
        {
          id: 1,
          suit: '♠',
          value: 'A',
          visble: true,
        },
      ],
      [
        {
          id: 2,
          suit: '♠',
          value: 2,
        },
        {
          id: 3,
          suit: '♠',
          value: 3,
        },
        {
          id: 4,
          suit: '♠',
          value: 4,
          visible: true,
        },
      ],
      [],
    ];

    const selectedColumn = 2;

    const result = getLastCard(cards, selectedColumn);

    expect(result).toStrictEqual({});
  });

  it('should return last cards from all columns', () => {
    const cards = [
      [
        {
          id: 1,
          suit: '♠',
          value: 'A',
          visble: true,
        },
      ],
      [
        {
          id: 2,
          suit: '♠',
          value: 2,
        },
        {
          id: 3,
          suit: '♠',
          value: 3,
        },
        {
          id: 4,
          suit: '♠',
          value: 4,
          visible: true,
        },
      ],
      [
        {
          id: 5,
          suit: '♦',
          value: 'A',
          visble: true,
        },
      ],
      [],
    ];

    const result = getLastCards(cards);

    expect(result).toStrictEqual([
      { id: 1, suit: '♠', value: 'A', visble: true },
      { id: 4, suit: '♠', value: 4, visible: true },
      { id: 5, suit: '♦', value: 'A', visble: true },
    ]);
  });

  it('should show last card in column', () => {
    const cards = [
      {
        id: 1,
        suit: '♠',
        value: 2,
        visible: false,
      },
      {
        id: 2,
        suit: '♠',
        value: 3,
        visible: false,
      },
      {
        id: 3,
        suit: '♠',
        value: 4,
        visible: false,
      },
    ];

    const result = showLastCard(cards);

    expect(result).toStrictEqual([
      { id: 1, suit: '♠', value: 2, visible: false },
      { id: 2, suit: '♠', value: 3, visible: false },
      { id: 3, suit: '♠', value: 4, visible: true },
    ]);
  });

  it('should match card', () => {
    const card = {
      id: 1,
      suit: '♠',
      value: 2,
    };

    const value = 2;

    const result = checkCardValue(card, value);

    expect(result).toBe(true);
  });

  it('should not match card', () => {
    const card = {
      id: 1,
      suit: '♠',
      value: 3,
      visible: false,
    };

    const value = 2;

    const result = checkCardValue(card, value);

    expect(result).toBe(false);
  });

  it('should be a top position card', () => {
    const cards = [
      [
        {
          id: 1,
          suit: '♠',
          value: 2,
          visible: false,
        },
        {
          id: 2,
          suit: '♠',
          value: 3,
          visible: false,
        },
        {
          id: 3,
          suit: '♠',
          value: 4,
          visible: false,
        },
      ],
    ];

    const selectedCardId = 1;

    const result = checkCardTopPosition(cards, selectedCardId);

    expect(result).toBe(true);
  });

  it('should not be a top position card', () => {
    const cards = [
      [
        {
          id: 1,
          suit: '♠',
          value: 2,
          visible: false,
        },
        {
          id: 2,
          suit: '♠',
          value: 3,
          visible: false,
        },
        {
          id: 3,
          suit: '♠',
          value: 4,
          visible: false,
        },
      ],
    ];

    const selectedCardId = 3;

    const result = checkCardTopPosition(cards, selectedCardId);

    expect(result).toBe(false);
  });

  it('should return column cards', () => {
    const obj = {
      toCards: [
        [],
        [
          {
            id: 52,
            order: 8,
            suit: '♠',
            value: '8',
            visible: true,
          },
        ],
        [],
        [],
      ],
      fromCards: [
        [
          {
            id: 1,
            order: 7,
            suit: '♠',
            value: '7',
            visible: true,
          },
        ],
      ],
      selectedColumn: 1,
      columnNo: 0,
      cardPosition: 0,
    };

    const result = getColumnCards(obj);

    expect(result).toStrictEqual([
      { id: 52, order: 8, suit: '♠', value: '8', visible: true },
      { id: 1, order: 7, suit: '♠', value: '7', visible: true },
    ]);
  });
});
