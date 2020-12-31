import { initBoardCards } from '../board';
import settings from '../../settings.json';

describe('board', () => {
  it('init board cards', () => {
    const toShuffle = false;

    const result = initBoardCards(settings, toShuffle);

    expect(result).toStrictEqual([
      [
        { id: 0, order: 0, suit: '♣', value: 'A', visible: true },
        { id: 13, order: 0, suit: '♠', value: 'A', visible: false },
        { id: 26, order: 0, suit: '♥', value: 'A', visible: true },
        { id: 39, order: 0, suit: '♦', value: 'A', visible: false },
        { id: 1, order: 1, suit: '♣', value: '2', visible: true },
        { id: 14, order: 1, suit: '♠', value: '2', visible: false },
        { id: 27, order: 1, suit: '♥', value: '2', visible: true },
      ],
      [
        { id: 40, order: 1, suit: '♦', value: '2', visible: true },
        { id: 2, order: 2, suit: '♣', value: '3', visible: false },
        { id: 15, order: 2, suit: '♠', value: '3', visible: true },
        { id: 28, order: 2, suit: '♥', value: '3', visible: false },
        { id: 41, order: 2, suit: '♦', value: '3', visible: true },
        { id: 3, order: 3, suit: '♣', value: '4', visible: false },
        { id: 16, order: 3, suit: '♠', value: '4', visible: true },
      ],
      [
        { id: 29, order: 3, suit: '♥', value: '4', visible: true },
        { id: 42, order: 3, suit: '♦', value: '4', visible: false },
        { id: 4, order: 4, suit: '♣', value: '5', visible: true },
        { id: 17, order: 4, suit: '♠', value: '5', visible: false },
        { id: 30, order: 4, suit: '♥', value: '5', visible: true },
        { id: 43, order: 4, suit: '♦', value: '5', visible: false },
        { id: 5, order: 5, suit: '♣', value: '6', visible: true },
      ],
      [
        { id: 18, order: 5, suit: '♠', value: '6', visible: true },
        { id: 31, order: 5, suit: '♥', value: '6', visible: false },
        { id: 44, order: 5, suit: '♦', value: '6', visible: true },
        { id: 6, order: 6, suit: '♣', value: '7', visible: false },
        { id: 19, order: 6, suit: '♠', value: '7', visible: true },
        { id: 32, order: 6, suit: '♥', value: '7', visible: false },
        { id: 45, order: 6, suit: '♦', value: '7', visible: true },
      ],
      [
        { id: 7, order: 7, suit: '♣', value: '8', visible: false },
        { id: 20, order: 7, suit: '♠', value: '8', visible: true },
        { id: 33, order: 7, suit: '♥', value: '8', visible: false },
        { id: 46, order: 7, suit: '♦', value: '8', visible: true },
        { id: 8, order: 8, suit: '♣', value: '9', visible: false },
        { id: 21, order: 8, suit: '♠', value: '9', visible: true },
      ],
      [
        { id: 34, order: 8, suit: '♥', value: '9', visible: false },
        { id: 47, order: 8, suit: '♦', value: '9', visible: true },
        { id: 9, order: 9, suit: '♣', value: '10', visible: false },
        { id: 22, order: 9, suit: '♠', value: '10', visible: true },
        { id: 35, order: 9, suit: '♥', value: '10', visible: false },
        { id: 48, order: 9, suit: '♦', value: '10', visible: true },
      ],
      [
        { id: 10, order: 10, suit: '♣', value: 'J', visible: false },
        { id: 23, order: 10, suit: '♠', value: 'J', visible: true },
        { id: 36, order: 10, suit: '♥', value: 'J', visible: false },
        { id: 49, order: 10, suit: '♦', value: 'J', visible: true },
        { id: 11, order: 11, suit: '♣', value: 'Q', visible: false },
        { id: 24, order: 11, suit: '♠', value: 'Q', visible: true },
      ],
      [
        { id: 37, order: 11, suit: '♥', value: 'Q', visible: false },
        { id: 50, order: 11, suit: '♦', value: 'Q', visible: true },
        { id: 12, order: 12, suit: '♣', value: 'K', visible: false },
        { id: 25, order: 12, suit: '♠', value: 'K', visible: true },
        { id: 38, order: 12, suit: '♥', value: 'K', visible: false },
        { id: 51, order: 12, suit: '♦', value: 'K', visible: true },
      ],
    ]);
  });
});
