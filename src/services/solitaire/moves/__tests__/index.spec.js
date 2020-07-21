import { checkValidCardMove, checkHasMoves, moveCardsFrom, moveCardsTo } from '../index';

describe('moves', () => {
  describe('valid card move', () => {
    it('should have valid moves', () => {
      const obj = {
        boardCards: [
          [
            {
              id: 1,
              suit: 's',
              order: 3,
            },
            {
              id: 2,
              suit: 's',
              order: 8,
              visible: true,
            },
            {
              id: 3,
              suit: 'd',
              order: 8,
              visible: true,
            },
          ],
          [
            {
              id: 4,
              suit: 's',
              order: 9,
              visible: true,
            },
          ],
        ],
        selectedCardId: 2,
      };

      const selectedColumn = 1;

      const result = checkValidCardMove(obj, selectedColumn);

      expect(result).toBe(true);
    });

    it('should not have valid moves', () => {
      const obj = {
        boardCards: [
          [
            {
              id: 1,
              suit: 's',
              order: 3,
            },
            {
              id: 2,
              suit: 's',
              order: 8,
              visible: true,
            },
            {
              id: 3,
              suit: 'd',
              order: 8,
              visible: true,
            },
          ],
          [
            {
              id: 4,
              suit: 's',
              order: 10,
              visible: true,
            },
          ],
        ],
        selectedCardId: 2,
      };

      const selectedColumn = 1;

      const result = checkValidCardMove(obj, selectedColumn);

      expect(result).toBe(false);
    });
  });

  describe('has moves', () => {
    it('should have moves', () => {
      const obj = {
        boardCards: [
          [
            {
              id: 1,
              value: 'A',
              suit: 'c',
              visible: true,
            },
          ],
        ],
        foundationCards: [],
      };

      const result = checkHasMoves(obj);

      expect(result).toBe(true);
    });

    it('should have no moves', () => {
      const obj = {
        boardCards: [
          [
            {
              id: 1,
              value: 'K',
              visible: true,
            },
          ],
        ],
        foundationCards: [],
      };

      const result = checkHasMoves(obj);

      expect(result).toBe(false);
    });
  });

  describe('move cards from', () => {
    it('should return correct object', () => {
      const obj = {
        boardCards: [
          [
            {
              id: 1,
              suit: 's',
              order: 3,
            },
            {
              id: 2,
              suit: 's',
              order: 8,
              visible: true,
            },
            {
              id: 3,
              suit: 'd',
              order: 8,
              visible: true,
            },
          ],
          [
            {
              id: 4,
              suit: 's',
              order: 9,
              visible: true,
            },
          ],
        ],
        selectedCardId: 3,
      };

      const result = moveCardsFrom(obj);

      expect(result).toStrictEqual({
        cards: [
          { id: 1, order: 3, suit: 's' },
          { id: 2, order: 8, suit: 's', visible: true },
        ],
        columnNo: 0,
      });
    });
  });

  describe('move cards to', () => {
    it('should return correct object', () => {
      const obj = {
        boardCards: [
          [
            {
              id: 1,
              suit: 's',
              order: 3,
            },
            {
              id: 2,
              suit: 's',
              order: 8,
              visible: true,
            },
            {
              id: 3,
              suit: 'd',
              order: 8,
              visible: true,
            },
          ],
          [
            {
              id: 4,
              suit: 's',
              order: 9,
              visible: true,
            },
          ],
        ],
        selectedCardId: 2,
      };

      const selectedColumn = 1;

      const result = moveCardsTo(obj, selectedColumn);

      expect(result).toStrictEqual({
        cards: [
          {
            id: 4,
            order: 9,
            suit: 's',
            visible: true,
          },
          {
            id: 2,
            order: 8,
            suit: 's',
            visible: true,
          },
          {
            id: 3,
            order: 8,
            suit: 'd',
            visible: true,
          },
        ],
        columnNo: 1,
      });
    });
  });
});
