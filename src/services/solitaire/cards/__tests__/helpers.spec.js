import {
  setVisibleCards,
  getColumnCardIndexes,
  getColumnCardsFromDeck,
} from '../helpers';
import { columns } from '../../settings.json';

describe('cards', () => {
  it('should set every 2 card visible', () => {
    const cards = [
      [
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
          id: 3,
          suit: '♠',
          value: 4,
        },
      ],
    ];

    const result = setVisibleCards(cards);

    expect(result).toStrictEqual([
      [
        { id: 1, suit: '♠', value: 'A' },
        { id: 2, suit: '♠', value: 2, visible: true },
        { id: 3, suit: '♠', value: 3 },
        { id: 3, suit: '♠', value: 4, visible: true },
      ],
    ]);
  });

  it('should set column card indexes', () => {
    const result = getColumnCardIndexes(columns);

    expect(result).toStrictEqual([
      { endIndex: 7, startIndex: 0 },
      { endIndex: 14, startIndex: 7 },
      { endIndex: 21, startIndex: 14 },
      { endIndex: 28, startIndex: 21 },
      { endIndex: 34, startIndex: 28 },
      { endIndex: 40, startIndex: 34 },
      { endIndex: 46, startIndex: 40 },
      { endIndex: 52, startIndex: 46 },
    ]);
  });

  it('should get column cards from deck', () => {
    const deck = [
      { id: 1, order: 1, suit: '♣', value: 'A', visible: false },
      { id: 14, order: 1, suit: '♠', value: 'A', visible: false },
      { id: 27, order: 1, suit: '♥', value: 'A', visible: false },
      { id: 40, order: 1, suit: '♦', value: 'A', visible: false },
      { id: 2, order: 2, suit: '♣', value: '2', visible: false },
      { id: 15, order: 2, suit: '♠', value: '2', visible: false },
      { id: 28, order: 2, suit: '♥', value: '2', visible: false },
    ];

    const columnCardsIndexes = [
      { endIndex: 4, startIndex: 0 },
      { endIndex: 7, startIndex: 4 },
    ];

    const result = getColumnCardsFromDeck(deck, columnCardsIndexes);

    expect(result).toStrictEqual([
      [
        { id: 1, order: 1, suit: '♣', value: 'A', visible: false },
        { id: 14, order: 1, suit: '♠', value: 'A', visible: false },
        { id: 27, order: 1, suit: '♥', value: 'A', visible: false },
        { id: 40, order: 1, suit: '♦', value: 'A', visible: false },
      ],
      [
        { id: 2, order: 2, suit: '♣', value: '2', visible: false },
        { id: 15, order: 2, suit: '♠', value: '2', visible: false },
        { id: 28, order: 2, suit: '♥', value: '2', visible: false },
      ],
    ]);
  });
});
