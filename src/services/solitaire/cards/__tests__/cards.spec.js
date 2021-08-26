import {
  buildCards,
  shuffleCards,
  findCardPosition,
  findCardColumn,
} from '../cards';
import { ranks, suits } from '../../settings.json';

describe('cards', () => {
  it('should find card in position 1', () => {
    const cards = [
      {
        id: 1,
        suit: '♠',
        value: 'A',
      },
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
      },
    ];
    const selectedCardId = 2;

    const result = findCardPosition(cards, selectedCardId);

    expect(result).toBe(1);
  });

  it('should find card in column 1', () => {
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
          id: 4,
          suit: '♠',
          value: 4,
        },
      ],
    ];
    const selectedCardId = 2;

    const result = findCardColumn(cards, selectedCardId);

    expect(result).toBe(1);
  });

  it('should build deck from settings', () => {
    const result = buildCards({ ranks, suits });

    expect(result).toStrictEqual([
      { id: 1, order: 1, suit: '♣', value: 'A' },
      { id: 14, order: 1, suit: '♠', value: 'A' },
      { id: 27, order: 1, suit: '♥', value: 'A' },
      { id: 40, order: 1, suit: '♦', value: 'A' },
      { id: 2, order: 2, suit: '♣', value: '2' },
      { id: 15, order: 2, suit: '♠', value: '2' },
      { id: 28, order: 2, suit: '♥', value: '2' },
      { id: 41, order: 2, suit: '♦', value: '2' },
      { id: 3, order: 3, suit: '♣', value: '3' },
      { id: 16, order: 3, suit: '♠', value: '3' },
      { id: 29, order: 3, suit: '♥', value: '3' },
      { id: 42, order: 3, suit: '♦', value: '3' },
      { id: 4, order: 4, suit: '♣', value: '4' },
      { id: 17, order: 4, suit: '♠', value: '4' },
      { id: 30, order: 4, suit: '♥', value: '4' },
      { id: 43, order: 4, suit: '♦', value: '4' },
      { id: 5, order: 5, suit: '♣', value: '5' },
      { id: 18, order: 5, suit: '♠', value: '5' },
      { id: 31, order: 5, suit: '♥', value: '5' },
      { id: 44, order: 5, suit: '♦', value: '5' },
      { id: 6, order: 6, suit: '♣', value: '6' },
      { id: 19, order: 6, suit: '♠', value: '6' },
      { id: 32, order: 6, suit: '♥', value: '6' },
      { id: 45, order: 6, suit: '♦', value: '6' },
      { id: 7, order: 7, suit: '♣', value: '7' },
      { id: 20, order: 7, suit: '♠', value: '7' },
      { id: 33, order: 7, suit: '♥', value: '7' },
      { id: 46, order: 7, suit: '♦', value: '7' },
      { id: 8, order: 8, suit: '♣', value: '8' },
      { id: 21, order: 8, suit: '♠', value: '8' },
      { id: 34, order: 8, suit: '♥', value: '8' },
      { id: 47, order: 8, suit: '♦', value: '8' },
      { id: 9, order: 9, suit: '♣', value: '9' },
      { id: 22, order: 9, suit: '♠', value: '9' },
      { id: 35, order: 9, suit: '♥', value: '9' },
      { id: 48, order: 9, suit: '♦', value: '9' },
      { id: 10, order: 10, suit: '♣', value: '10' },
      { id: 23, order: 10, suit: '♠', value: '10' },
      { id: 36, order: 10, suit: '♥', value: '10' },
      { id: 49, order: 10, suit: '♦', value: '10' },
      { id: 11, order: 11, suit: '♣', value: 'J' },
      { id: 24, order: 11, suit: '♠', value: 'J' },
      { id: 37, order: 11, suit: '♥', value: 'J' },
      { id: 50, order: 11, suit: '♦', value: 'J' },
      { id: 12, order: 12, suit: '♣', value: 'Q' },
      { id: 25, order: 12, suit: '♠', value: 'Q' },
      { id: 38, order: 12, suit: '♥', value: 'Q' },
      { id: 51, order: 12, suit: '♦', value: 'Q' },
      { id: 13, order: 13, suit: '♣', value: 'K' },
      { id: 26, order: 13, suit: '♠', value: 'K' },
      { id: 39, order: 13, suit: '♥', value: 'K' },
      { id: 52, order: 13, suit: '♦', value: 'K' },
    ]);
  });

  it('should shuffle cards', () => {
    const deck = buildCards({ ranks, suits });
    const result = shuffleCards(deck);

    expect(result).not.toStrictEqual([
      { id: 1, order: 1, suit: '♣', value: 'A' },
      { id: 14, order: 1, suit: '♠', value: 'A' },
      { id: 27, order: 1, suit: '♥', value: 'A' },
      { id: 40, order: 1, suit: '♦', value: 'A' },
      { id: 2, order: 2, suit: '♣', value: '2' },
      { id: 15, order: 2, suit: '♠', value: '2' },
      { id: 28, order: 2, suit: '♥', value: '2' },
      { id: 41, order: 2, suit: '♦', value: '2' },
      { id: 3, order: 3, suit: '♣', value: '3' },
      { id: 16, order: 3, suit: '♠', value: '3' },
      { id: 29, order: 3, suit: '♥', value: '3' },
      { id: 42, order: 3, suit: '♦', value: '3' },
      { id: 4, order: 4, suit: '♣', value: '4' },
      { id: 17, order: 4, suit: '♠', value: '4' },
      { id: 30, order: 4, suit: '♥', value: '4' },
      { id: 43, order: 4, suit: '♦', value: '4' },
      { id: 5, order: 5, suit: '♣', value: '5' },
      { id: 18, order: 5, suit: '♠', value: '5' },
      { id: 31, order: 5, suit: '♥', value: '5' },
      { id: 44, order: 5, suit: '♦', value: '5' },
      { id: 6, order: 6, suit: '♣', value: '6' },
      { id: 19, order: 6, suit: '♠', value: '6' },
      { id: 32, order: 6, suit: '♥', value: '6' },
      { id: 45, order: 6, suit: '♦', value: '6' },
      { id: 7, order: 7, suit: '♣', value: '7' },
      { id: 20, order: 7, suit: '♠', value: '7' },
      { id: 33, order: 7, suit: '♥', value: '7' },
      { id: 46, order: 7, suit: '♦', value: '7' },
      { id: 8, order: 8, suit: '♣', value: '8' },
      { id: 21, order: 8, suit: '♠', value: '8' },
      { id: 34, order: 8, suit: '♥', value: '8' },
      { id: 47, order: 8, suit: '♦', value: '8' },
      { id: 9, order: 9, suit: '♣', value: '9' },
      { id: 22, order: 9, suit: '♠', value: '9' },
      { id: 35, order: 9, suit: '♥', value: '9' },
      { id: 48, order: 9, suit: '♦', value: '9' },
      { id: 10, order: 10, suit: '♣', value: '10' },
      { id: 23, order: 10, suit: '♠', value: '10' },
      { id: 36, order: 10, suit: '♥', value: '10' },
      { id: 49, order: 10, suit: '♦', value: '10' },
      { id: 11, order: 11, suit: '♣', value: 'J' },
      { id: 24, order: 11, suit: '♠', value: 'J' },
      { id: 37, order: 11, suit: '♥', value: 'J' },
      { id: 50, order: 11, suit: '♦', value: 'J' },
      { id: 12, order: 12, suit: '♣', value: 'Q' },
      { id: 25, order: 12, suit: '♠', value: 'Q' },
      { id: 38, order: 12, suit: '♥', value: 'Q' },
      { id: 51, order: 12, suit: '♦', value: 'Q' },
      { id: 13, order: 13, suit: '♣', value: 'K' },
      { id: 26, order: 13, suit: '♠', value: 'K' },
      { id: 39, order: 13, suit: '♥', value: 'K' },
      { id: 52, order: 13, suit: '♦', value: 'K' },
    ]);
  });
});
