import { columns } from '../../config';
import { setBoard, getColumnIndexes, getColumnCards } from '../board';

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
          id: 4,
          suit: '♠',
          value: 4,
        },
      ],
    ];

    const result = setBoard(cards);

    expect(result).toStrictEqual([
      [
        { id: 1, suit: '♠', value: 'A', visible: false },
        { id: 2, suit: '♠', value: 2, visible: true },
        { id: 3, suit: '♠', value: 3, visible: false },
        { id: 4, suit: '♠', value: 4, visible: true },
      ],
    ]);
  });

  it('should set column card indexes', () => {
    const result = getColumnIndexes(columns);

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
      { id: 1, order: 1, suit: '♣', value: 'A' },
      { id: 2, order: 1, suit: '♠', value: 'A' },
      { id: 3, order: 1, suit: '♥', value: 'A' },
      { id: 4, order: 1, suit: '♦', value: 'A' },
      { id: 5, order: 2, suit: '♣', value: '2' },
      { id: 6, order: 2, suit: '♠', value: '2' },
      { id: 7, order: 2, suit: '♥', value: '2' },
    ];

    const columnCardsIndexes = [
      { endIndex: 4, startIndex: 0 },
      { endIndex: 7, startIndex: 4 },
    ];

    const result = getColumnCards(deck, columnCardsIndexes);

    expect(result).toStrictEqual([
      [
        { id: 1, order: 1, suit: '♣', value: 'A' },
        { id: 2, order: 1, suit: '♠', value: 'A' },
        { id: 3, order: 1, suit: '♥', value: 'A' },
        { id: 4, order: 1, suit: '♦', value: 'A' },
      ],
      [
        { id: 5, order: 2, suit: '♣', value: '2' },
        { id: 6, order: 2, suit: '♠', value: '2' },
        { id: 7, order: 2, suit: '♥', value: '2' },
      ],
    ]);
  });
});
