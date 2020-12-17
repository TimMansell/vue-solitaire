import {
  checkValidCardMove,
  checkHasMoves,
  moveBoardCards,
  checkValidFoundationMove,
  moveFoundationCards,
} from '../index';

describe('moves', () => {
  describe('valid moves', () => {
    it('should have valid moves', () => {
      const obj = {
        boardCards: [
          [
            {
              id: 1,
              suit: '♠',
              order: 3,
            },
            {
              id: 2,
              suit: '♠',
              order: 8,
              visible: true,
            },
            {
              id: 3,
              suit: '♦',
              order: 8,
              visible: true,
            },
          ],
          [
            {
              id: 4,
              suit: '♠',
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
              suit: '♠',
              order: 3,
            },
            {
              id: 2,
              suit: '♠',
              order: 8,
              visible: true,
            },
            {
              id: 3,
              suit: '♦',
              order: 8,
              visible: true,
            },
          ],
          [
            {
              id: 4,
              suit: '♠',
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

    it('should have valid ace foundation moves', () => {
      const obj = {
        boardCards: [
          [
            {
              id: 1,
              suit: '♦',
              value: 'A',
              visible: true,
            },
          ],
        ],
        foundationCards: [[], [], [], []],
        selectedCardId: 1,
      };

      const selectedColumn = 0;

      const result = checkValidFoundationMove(obj, selectedColumn);

      expect(result).toBe(true);
    });

    it('should have valid non-ace foundation moves', () => {
      const obj = {
        boardCards: [
          [
            {
              id: 1,
              suit: '♠',
              order: 1,
              value: 2,
            },
          ],
        ],
        foundationCards: [
          [
            {
              id: 2,
              suit: '♠',
              order: 0,
              value: 'A',
            },
          ],
          [],
          [],
          [],
        ],
        selectedCardId: 1,
      };

      const selectedColumn = 0;

      const result = checkValidFoundationMove(obj, selectedColumn);

      expect(result).toBe(true);
    });

    it('should not have valid ace foundation move', () => {
      const obj = {
        boardCards: [
          [
            {
              id: 1,
              suit: '♦',
              value: 'A',
              order: 1,
            },
          ],
        ],
        foundationCards: [
          [
            {
              id: 2,
              suit: '♠',
              value: 'A',
              order: 1,
            },
          ],
          [],
          [],
          [],
        ],
        selectedCardId: 1,
      };

      const selectedColumn = 0;

      const result = checkValidFoundationMove(obj, selectedColumn);

      expect(result).toBe(false);
    });

    it('should not have valid non-ace to ace foundation move', () => {
      const obj = {
        boardCards: [
          [
            {
              id: 1,
              suit: '♦',
              value: 2,
              order: 2,
            },
          ],
        ],
        foundationCards: [
          [
            {
              id: 2,
              suit: '♠',
              value: 'A',
              order: 1,
            },
          ],
          [],
          [],
          [],
        ],
        selectedCardId: 1,
      };

      const selectedColumn = 0;

      const result = checkValidFoundationMove(obj, selectedColumn);

      expect(result).toBe(false);
    });

    it('should not have valid non-ace to empty foundation column move', () => {
      const obj = {
        boardCards: [
          [
            {
              id: 1,
              suit: '♦',
              value: 3,
              order: 3,
            },
          ],
        ],
        foundationCards: [
          [
            {
              id: 2,
              suit: '♠',
              value: 'A',
              order: 1,
            },
          ],
          [],
          [],
          [],
        ],
        selectedCardId: 1,
      };

      const selectedColumn = 1;

      const result = checkValidFoundationMove(obj, selectedColumn);

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
              suit: '♣',
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

  describe('moves', () => {
    it('move board cards', () => {
      const obj = {
        boardCards: [
          [
            {
              id: 1,
              suit: '♠',
              order: 3,
            },
            {
              id: 2,
              suit: '♠',
              order: 8,
              visible: true,
            },
            {
              id: 3,
              suit: '♦',
              order: 8,
              visible: true,
            },
          ],
          [
            {
              id: 4,
              suit: '♠',
              order: 9,
              visible: true,
            },
          ],
        ],
        selectedCardId: 2,
      };

      const selectedColumn = 1;

      const result = moveBoardCards(obj, selectedColumn);

      expect(result).toStrictEqual({
        cardsFrom: {
          cards: [{ id: 1, order: 3, suit: '♠', visible: true }],
          columnNo: 0,
        },
        cardsTo: {
          cards: [
            { id: 4, order: 9, suit: '♠', visible: true },
            { id: 2, order: 8, suit: '♠', visible: true },
            { id: 3, order: 8, suit: '♦', visible: true },
          ],
          columnNo: 1,
        },
      });
    });

    it('move foundation cards', () => {
      const obj = {
        boardCards: [
          [
            {
              id: 1,
              suit: '♠',
              value: 3,
            },
            {
              id: 2,
              suit: '♠',
              value: 8,
              visible: true,
            },
            {
              id: 3,
              suit: '♦',
              value: 'A',
              visible: true,
            },
          ],
        ],
        foundationCards: [[]],
        selectedCardId: 3,
      };

      const selectedColumn = 0;

      const result = moveFoundationCards(obj, selectedColumn);

      expect(result).toStrictEqual({
        cardsFrom: {
          cards: [
            { id: 1, suit: '♠', value: 3 },
            { id: 2, suit: '♠', value: 8, visible: true },
          ],
          columnNo: 0,
        },
        foundationCardsTo: {
          cards: [{ id: 3, suit: '♦', value: 'A', visible: true }],
          columnNo: 0,
        },
      });
    });
  });
});
