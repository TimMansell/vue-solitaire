import { updateBoard, checkEmptyColumns } from '../index';

describe('board', () => {
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
              suit: 's',
              value: 3,
            },
          ],
          columnNo: 0,
        },
        cardsTo: {
          cards: [
            {
              id: 2,
              suit: 's',
              value: 4,
            },
          ],
          columnNo: 2,
        },
      };

      const result = updateBoard(state, cards);

      expect(result).toStrictEqual([
        [{ id: 1, suit: 's', value: 3 }],
        [],
        [{ id: 2, suit: 's', value: 4 }],
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
              suit: 's',
              value: 3,
            },
          ],
          columnNo: 0,
        },
      };

      const result = updateBoard(state, cards);

      expect(result).toStrictEqual([[{ id: 1, suit: 's', value: 3 }], [], [], [], [], [], [], []]);
    });
  });

  describe('empty columns', () => {
    it('should have no empty columns', () => {
      const cards = [[], [], [], [], [], [], [], []];

      const result = checkEmptyColumns(cards);

      expect(result).toBe(false);
    });

    it('should have empty columns', () => {
      const cards = [[], [], [], [], [], [], []];

      const result = checkEmptyColumns(cards);

      expect(result).toBe(true);
    });
  });
});
