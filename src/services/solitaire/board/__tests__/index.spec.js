import { initBoard, loadBoard, updateBoard } from '../index';
import settings from '../../settings.json';
import fixture from '../../../../../tests/fixtures/boards/aceOnlyMove.json';

describe('board', () => {
  describe('init board', () => {
    it('should shuffle cards', () => {
      const { cards } = fixture;

      const result = initBoard(settings, cards);

      expect(result).not.toStrictEqual(fixture);
    });
  });

  describe('load board', () => {
    it('should return cards', () => {
      const board = {
        foundation: [[], [], [], []],
        cards: [[], []],
      };

      const result = loadBoard(board);

      expect(result).toStrictEqual([[], []]);
    });
  });

  describe('update board', () => {
    it('should update both from and to columns', () => {
      const state = {
        boardCards: [[], [], [], [], [], [], [], []],
      };

      const cards = {
        cardsFrom: {
          cards: [
            {
              id: 1,
              suit: '♠',
              value: 3,
            },
          ],
          columnNo: 0,
        },
        cardsTo: {
          cards: [
            {
              id: 2,
              suit: '♠',
              value: 4,
            },
          ],
          columnNo: 2,
        },
      };

      const result = updateBoard(state, cards);

      expect(result).toStrictEqual([
        [{ id: 1, suit: '♠', value: 3 }],
        [],
        [{ id: 2, suit: '♠', value: 4 }],
        [],
        [],
        [],
        [],
        [],
      ]);
    });

    it('should update only from column', () => {
      const state = {
        boardCards: [[], [], [], [], [], [], [], []],
      };

      const cards = {
        cardsFrom: {
          cards: [
            {
              id: 1,
              suit: '♠',
              value: 3,
            },
          ],
          columnNo: 0,
        },
      };

      const result = updateBoard(state, cards);

      expect(result).toStrictEqual([
        [{ id: 1, suit: '♠', value: 3 }],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
      ]);
    });
  });
});
