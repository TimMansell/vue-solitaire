import {
  buildCards,
  dealCards,
  shuffleCards,
  getSelectedCard,
  getCardPosition,
  getVisibleCards,
  getLastCard,
  getLastCards,
  showLastCard,
  checkCardValue,
  checkCardTopPosition,
} from '../index';
import settings from '../../settings.json';

describe('cards', () => {
  it('should build deck from settings', () => {
    const result = buildCards(settings.cards);

    expect(result).toStrictEqual([
      { id: '0c', order: 0, suit: 'c', value: 'A', visible: false },
      { id: '0s', order: 0, suit: 's', value: 'A', visible: false },
      { id: '0h', order: 0, suit: 'h', value: 'A', visible: false },
      { id: '0d', order: 0, suit: 'd', value: 'A', visible: false },
      { id: '1c', order: 1, suit: 'c', value: '2', visible: false },
      { id: '1s', order: 1, suit: 's', value: '2', visible: false },
      { id: '1h', order: 1, suit: 'h', value: '2', visible: false },
      { id: '1d', order: 1, suit: 'd', value: '2', visible: false },
      { id: '2c', order: 2, suit: 'c', value: '3', visible: false },
      { id: '2s', order: 2, suit: 's', value: '3', visible: false },
      { id: '2h', order: 2, suit: 'h', value: '3', visible: false },
      { id: '2d', order: 2, suit: 'd', value: '3', visible: false },
      { id: '3c', order: 3, suit: 'c', value: '4', visible: false },
      { id: '3s', order: 3, suit: 's', value: '4', visible: false },
      { id: '3h', order: 3, suit: 'h', value: '4', visible: false },
      { id: '3d', order: 3, suit: 'd', value: '4', visible: false },
      { id: '4c', order: 4, suit: 'c', value: '5', visible: false },
      { id: '4s', order: 4, suit: 's', value: '5', visible: false },
      { id: '4h', order: 4, suit: 'h', value: '5', visible: false },
      { id: '4d', order: 4, suit: 'd', value: '5', visible: false },
      { id: '5c', order: 5, suit: 'c', value: '6', visible: false },
      { id: '5s', order: 5, suit: 's', value: '6', visible: false },
      { id: '5h', order: 5, suit: 'h', value: '6', visible: false },
      { id: '5d', order: 5, suit: 'd', value: '6', visible: false },
      { id: '6c', order: 6, suit: 'c', value: '7', visible: false },
      { id: '6s', order: 6, suit: 's', value: '7', visible: false },
      { id: '6h', order: 6, suit: 'h', value: '7', visible: false },
      { id: '6d', order: 6, suit: 'd', value: '7', visible: false },
      { id: '7c', order: 7, suit: 'c', value: '8', visible: false },
      { id: '7s', order: 7, suit: 's', value: '8', visible: false },
      { id: '7h', order: 7, suit: 'h', value: '8', visible: false },
      { id: '7d', order: 7, suit: 'd', value: '8', visible: false },
      { id: '8c', order: 8, suit: 'c', value: '9', visible: false },
      { id: '8s', order: 8, suit: 's', value: '9', visible: false },
      { id: '8h', order: 8, suit: 'h', value: '9', visible: false },
      { id: '8d', order: 8, suit: 'd', value: '9', visible: false },
      { id: '9c', order: 9, suit: 'c', value: '10', visible: false },
      { id: '9s', order: 9, suit: 's', value: '10', visible: false },
      { id: '9h', order: 9, suit: 'h', value: '10', visible: false },
      { id: '9d', order: 9, suit: 'd', value: '10', visible: false },
      { id: '10c', order: 10, suit: 'c', value: 'J', visible: false },
      { id: '10s', order: 10, suit: 's', value: 'J', visible: false },
      { id: '10h', order: 10, suit: 'h', value: 'J', visible: false },
      { id: '10d', order: 10, suit: 'd', value: 'J', visible: false },
      { id: '11c', order: 11, suit: 'c', value: 'Q', visible: false },
      { id: '11s', order: 11, suit: 's', value: 'Q', visible: false },
      { id: '11h', order: 11, suit: 'h', value: 'Q', visible: false },
      { id: '11d', order: 11, suit: 'd', value: 'Q', visible: false },
      { id: '12c', order: 12, suit: 'c', value: 'K', visible: false },
      { id: '12s', order: 12, suit: 's', value: 'K', visible: false },
      { id: '12h', order: 12, suit: 'h', value: 'K', visible: false },
      { id: '12d', order: 12, suit: 'd', value: 'K', visible: false },
    ]);
  });

  it('should deal cards into columns', () => {
    const deck = buildCards(settings.cards);
    const shuffledDeck = shuffleCards(deck, false);

    const result = dealCards(shuffledDeck, settings.rules);

    expect(result).toStrictEqual([
      [
        { id: '0c', order: 0, suit: 'c', value: 'A', visible: true },
        { id: '0s', order: 0, suit: 's', value: 'A', visible: false },
        { id: '0h', order: 0, suit: 'h', value: 'A', visible: true },
        { id: '0d', order: 0, suit: 'd', value: 'A', visible: false },
        { id: '1c', order: 1, suit: 'c', value: '2', visible: true },
        { id: '1s', order: 1, suit: 's', value: '2', visible: false },
        { id: '1h', order: 1, suit: 'h', value: '2', visible: true },
      ],
      [
        { id: '1d', order: 1, suit: 'd', value: '2', visible: true },
        { id: '2c', order: 2, suit: 'c', value: '3', visible: false },
        { id: '2s', order: 2, suit: 's', value: '3', visible: true },
        { id: '2h', order: 2, suit: 'h', value: '3', visible: false },
        { id: '2d', order: 2, suit: 'd', value: '3', visible: true },
        { id: '3c', order: 3, suit: 'c', value: '4', visible: false },
        { id: '3s', order: 3, suit: 's', value: '4', visible: true },
      ],
      [
        { id: '3h', order: 3, suit: 'h', value: '4', visible: true },
        { id: '3d', order: 3, suit: 'd', value: '4', visible: false },
        { id: '4c', order: 4, suit: 'c', value: '5', visible: true },
        { id: '4s', order: 4, suit: 's', value: '5', visible: false },
        { id: '4h', order: 4, suit: 'h', value: '5', visible: true },
        { id: '4d', order: 4, suit: 'd', value: '5', visible: false },
        { id: '5c', order: 5, suit: 'c', value: '6', visible: true },
      ],
      [
        { id: '5s', order: 5, suit: 's', value: '6', visible: true },
        { id: '5h', order: 5, suit: 'h', value: '6', visible: false },
        { id: '5d', order: 5, suit: 'd', value: '6', visible: true },
        { id: '6c', order: 6, suit: 'c', value: '7', visible: false },
        { id: '6s', order: 6, suit: 's', value: '7', visible: true },
        { id: '6h', order: 6, suit: 'h', value: '7', visible: false },
        { id: '6d', order: 6, suit: 'd', value: '7', visible: true },
      ],
      [
        { id: '7c', order: 7, suit: 'c', value: '8', visible: false },
        { id: '7s', order: 7, suit: 's', value: '8', visible: true },
        { id: '7h', order: 7, suit: 'h', value: '8', visible: false },
        { id: '7d', order: 7, suit: 'd', value: '8', visible: true },
        { id: '8c', order: 8, suit: 'c', value: '9', visible: false },
        { id: '8s', order: 8, suit: 's', value: '9', visible: true },
      ],
      [
        { id: '8h', order: 8, suit: 'h', value: '9', visible: false },
        { id: '8d', order: 8, suit: 'd', value: '9', visible: true },
        { id: '9c', order: 9, suit: 'c', value: '10', visible: false },
        { id: '9s', order: 9, suit: 's', value: '10', visible: true },
        { id: '9h', order: 9, suit: 'h', value: '10', visible: false },
        { id: '9d', order: 9, suit: 'd', value: '10', visible: true },
      ],
      [
        { id: '10c', order: 10, suit: 'c', value: 'J', visible: false },
        { id: '10s', order: 10, suit: 's', value: 'J', visible: true },
        { id: '10h', order: 10, suit: 'h', value: 'J', visible: false },
        { id: '10d', order: 10, suit: 'd', value: 'J', visible: true },
        { id: '11c', order: 11, suit: 'c', value: 'Q', visible: false },
        { id: '11s', order: 11, suit: 's', value: 'Q', visible: true },
      ],
      [
        { id: '11h', order: 11, suit: 'h', value: 'Q', visible: false },
        { id: '11d', order: 11, suit: 'd', value: 'Q', visible: true },
        { id: '12c', order: 12, suit: 'c', value: 'K', visible: false },
        { id: '12s', order: 12, suit: 's', value: 'K', visible: true },
        { id: '12h', order: 12, suit: 'h', value: 'K', visible: false },
        { id: '12d', order: 12, suit: 'd', value: 'K', visible: true },
      ],
    ]);
  });

  it('should not shuffle cards', () => {
    const deck = buildCards(settings.cards);

    const result = shuffleCards(deck, false);

    expect(result).toStrictEqual([
      { id: '0c', order: 0, suit: 'c', value: 'A', visible: false },
      { id: '0s', order: 0, suit: 's', value: 'A', visible: false },
      { id: '0h', order: 0, suit: 'h', value: 'A', visible: false },
      { id: '0d', order: 0, suit: 'd', value: 'A', visible: false },
      { id: '1c', order: 1, suit: 'c', value: '2', visible: false },
      { id: '1s', order: 1, suit: 's', value: '2', visible: false },
      { id: '1h', order: 1, suit: 'h', value: '2', visible: false },
      { id: '1d', order: 1, suit: 'd', value: '2', visible: false },
      { id: '2c', order: 2, suit: 'c', value: '3', visible: false },
      { id: '2s', order: 2, suit: 's', value: '3', visible: false },
      { id: '2h', order: 2, suit: 'h', value: '3', visible: false },
      { id: '2d', order: 2, suit: 'd', value: '3', visible: false },
      { id: '3c', order: 3, suit: 'c', value: '4', visible: false },
      { id: '3s', order: 3, suit: 's', value: '4', visible: false },
      { id: '3h', order: 3, suit: 'h', value: '4', visible: false },
      { id: '3d', order: 3, suit: 'd', value: '4', visible: false },
      { id: '4c', order: 4, suit: 'c', value: '5', visible: false },
      { id: '4s', order: 4, suit: 's', value: '5', visible: false },
      { id: '4h', order: 4, suit: 'h', value: '5', visible: false },
      { id: '4d', order: 4, suit: 'd', value: '5', visible: false },
      { id: '5c', order: 5, suit: 'c', value: '6', visible: false },
      { id: '5s', order: 5, suit: 's', value: '6', visible: false },
      { id: '5h', order: 5, suit: 'h', value: '6', visible: false },
      { id: '5d', order: 5, suit: 'd', value: '6', visible: false },
      { id: '6c', order: 6, suit: 'c', value: '7', visible: false },
      { id: '6s', order: 6, suit: 's', value: '7', visible: false },
      { id: '6h', order: 6, suit: 'h', value: '7', visible: false },
      { id: '6d', order: 6, suit: 'd', value: '7', visible: false },
      { id: '7c', order: 7, suit: 'c', value: '8', visible: false },
      { id: '7s', order: 7, suit: 's', value: '8', visible: false },
      { id: '7h', order: 7, suit: 'h', value: '8', visible: false },
      { id: '7d', order: 7, suit: 'd', value: '8', visible: false },
      { id: '8c', order: 8, suit: 'c', value: '9', visible: false },
      { id: '8s', order: 8, suit: 's', value: '9', visible: false },
      { id: '8h', order: 8, suit: 'h', value: '9', visible: false },
      { id: '8d', order: 8, suit: 'd', value: '9', visible: false },
      { id: '9c', order: 9, suit: 'c', value: '10', visible: false },
      { id: '9s', order: 9, suit: 's', value: '10', visible: false },
      { id: '9h', order: 9, suit: 'h', value: '10', visible: false },
      { id: '9d', order: 9, suit: 'd', value: '10', visible: false },
      { id: '10c', order: 10, suit: 'c', value: 'J', visible: false },
      { id: '10s', order: 10, suit: 's', value: 'J', visible: false },
      { id: '10h', order: 10, suit: 'h', value: 'J', visible: false },
      { id: '10d', order: 10, suit: 'd', value: 'J', visible: false },
      { id: '11c', order: 11, suit: 'c', value: 'Q', visible: false },
      { id: '11s', order: 11, suit: 's', value: 'Q', visible: false },
      { id: '11h', order: 11, suit: 'h', value: 'Q', visible: false },
      { id: '11d', order: 11, suit: 'd', value: 'Q', visible: false },
      { id: '12c', order: 12, suit: 'c', value: 'K', visible: false },
      { id: '12s', order: 12, suit: 's', value: 'K', visible: false },
      { id: '12h', order: 12, suit: 'h', value: 'K', visible: false },
      { id: '12d', order: 12, suit: 'd', value: 'K', visible: false },
    ]);
  });

  it('should return selected card', () => {
    const boardCards = [
      [
        {
          id: 1,
          suit: 's',
          value: 'A',
        },
      ],
      [
        {
          id: 2,
          suit: 's',
          value: 2,
        },
        {
          id: 3,
          suit: 's',
          value: 3,
        },
        {
          id: 3,
          suit: 's',
          value: 4,
        },
      ],
    ];
    const selectedCardId = 2;

    const result = getSelectedCard(boardCards, selectedCardId);

    expect(result).toStrictEqual({
      id: 2,
      suit: 's',
      value: 2,
    });
  });

  it('should return selected card position', () => {
    const boardCards = [
      [
        {
          id: 1,
          suit: 's',
          value: 'A',
        },
      ],
      [
        {
          id: 2,
          suit: 's',
          value: 2,
        },
        {
          id: 3,
          suit: 's',
          value: 3,
        },
        {
          id: 3,
          suit: 's',
          value: 4,
        },
      ],
    ];
    const selectedCardId = 2;

    const result = getCardPosition(boardCards, selectedCardId);

    expect(result).toStrictEqual({
      cardPosition: 0,
      columnNo: 1,
    });
  });

  it('should return all visible cards', () => {
    const boardCards = [
      [
        {
          id: 1,
          suit: 's',
          value: 'A',
          visible: true,
        },
      ],
      [
        {
          id: 2,
          suit: 's',
          value: 2,
        },
        {
          id: 3,
          suit: 's',
          value: 3,
        },
        {
          id: 3,
          suit: 's',
          value: 4,
          visible: true,
        },
      ],
    ];

    const result = getVisibleCards(boardCards);

    expect(result).toStrictEqual([
      { id: 1, suit: 's', value: 'A', visible: true },
      { id: 3, suit: 's', value: 4, visible: true },
    ]);
  });

  it('should return last card in second column', () => {
    const boardCards = [
      [
        {
          id: 1,
          suit: 's',
          value: 'A',
          visble: true,
        },
      ],
      [
        {
          id: 2,
          suit: 's',
          value: 2,
        },
        {
          id: 3,
          suit: 's',
          value: 3,
        },
        {
          id: 3,
          suit: 's',
          value: 4,
          visible: true,
        },
      ],
      [
        {
          id: 4,
          suit: 'd',
          value: 'A',
          visble: true,
        },
      ],
    ];

    const selectedColumn = 1;

    const result = getLastCard(boardCards, selectedColumn);

    expect(result).toStrictEqual({
      id: 3,
      suit: 's',
      value: 4,
      visible: true,
    });
  });

  it('should emtpy last card object for a selected empty column', () => {
    const boardCards = [
      [
        {
          id: 1,
          suit: 's',
          value: 'A',
          visble: true,
        },
      ],
      [
        {
          id: 2,
          suit: 's',
          value: 2,
        },
        {
          id: 3,
          suit: 's',
          value: 3,
        },
        {
          id: 3,
          suit: 's',
          value: 4,
          visible: true,
        },
      ],
      [],
    ];

    const selectedColumn = 2;

    const result = getLastCard(boardCards, selectedColumn);

    expect(result).toStrictEqual({});
  });

  it('should return last cards from all columns', () => {
    const boardCards = [
      [
        {
          id: 1,
          suit: 's',
          value: 'A',
          visble: true,
        },
      ],
      [
        {
          id: 2,
          suit: 's',
          value: 2,
        },
        {
          id: 3,
          suit: 's',
          value: 3,
        },
        {
          id: 3,
          suit: 's',
          value: 4,
          visible: true,
        },
      ],
      [
        {
          id: 4,
          suit: 'd',
          value: 'A',
          visble: true,
        },
      ],
      [],
    ];

    const result = getLastCards(boardCards);

    expect(result).toStrictEqual([
      { id: 1, suit: 's', value: 'A', visble: true },
      { id: 3, suit: 's', value: 4, visible: true },
      { id: 4, suit: 'd', value: 'A', visble: true },
    ]);
  });

  it('should show last card in column', () => {
    const cards = [
      {
        id: 2,
        suit: 's',
        value: 2,
        visible: false,
      },
      {
        id: 3,
        suit: 's',
        value: 3,
        visible: false,
      },
      {
        id: 3,
        suit: 's',
        value: 4,
        visible: false,
      },
    ];

    const result = showLastCard(cards);

    expect(result).toStrictEqual([
      { id: 2, suit: 's', value: 2, visible: false },
      { id: 3, suit: 's', value: 3, visible: false },
      { id: 3, suit: 's', value: 4, visible: true },
    ]);
  });

  it('should match card', () => {
    const card = {
      id: 1,
      suit: 's',
      value: 2,
      visible: false,
    };

    const value = 2;

    const result = checkCardValue(card, value);

    expect(result).toBe(true);
  });

  it('should not match card', () => {
    const card = {
      id: 1,
      suit: 's',
      value: 3,
      visible: false,
    };

    const value = 2;

    const result = checkCardValue(card, value);

    expect(result).toBe(false);
  });

  it('should be a top position card', () => {
    const boardCards = [
      [
        {
          id: 2,
          suit: 's',
          value: 2,
          visible: false,
        },
        {
          id: 3,
          suit: 's',
          value: 3,
          visible: false,
        },
        {
          id: 3,
          suit: 's',
          value: 4,
          visible: false,
        },
      ],
    ];

    const selectedCardId = 2;

    const result = checkCardTopPosition(boardCards, selectedCardId);

    expect(result).toBe(true);
  });

  it('should not be a top position card', () => {
    const boardCards = [
      [
        {
          id: 2,
          suit: 's',
          value: 2,
          visible: false,
        },
        {
          id: 3,
          suit: 's',
          value: 3,
          visible: false,
        },
        {
          id: 3,
          suit: 's',
          value: 4,
          visible: false,
        },
      ],
    ];

    const selectedCardId = 3;

    const result = checkCardTopPosition(boardCards, selectedCardId);

    expect(result).toBe(false);
  });
});
