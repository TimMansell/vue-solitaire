import { initBoard, updateBoard } from '../index';

describe('board', () => {
  describe('init board', () => {
    it('should return shuffled cards in columns', () => {
      const [col1, col2, col3, col4, col5, col6, col7, col8] = initBoard();

      expect(col1).toHaveLength(7);
      expect(col2).toHaveLength(7);
      expect(col3).toHaveLength(7);
      expect(col4).toHaveLength(7);
      expect(col5).toHaveLength(6);
      expect(col6).toHaveLength(6);
      expect(col7).toHaveLength(6);
      expect(col8).toHaveLength(6);
    });
  });

  describe('update board', () => {
    it('should update both from and to columns', () => {
      const state = {
        cards: [[], [], [], [], [], [], [], []],
      };

      const obj = {
        cardsFrom: {
          columnCards: [
            {
              id: 1,
              suit: '♠',
              value: 3,
            },
          ],
          columnNo: 0,
        },
        cardsTo: {
          columnCards: [
            {
              id: 2,
              suit: '♠',
              value: 4,
            },
          ],
          columnNo: 2,
        },
      };

      const result = updateBoard(state, obj);

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
        cards: [[], [], [], [], [], [], [], []],
      };

      const obj = {
        cardsFrom: {
          columnCards: [
            {
              id: 1,
              suit: '♠',
              value: 3,
            },
          ],
          columnNo: 0,
        },
      };

      const result = updateBoard(state, obj);

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
