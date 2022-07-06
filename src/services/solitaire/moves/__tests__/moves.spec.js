import {
  checkVisibleMoves,
  checkKingMoves,
  checkFoundationMoves,
  getMoveCardsFromBoard,
  getMoveCardsToBoard,
  getMoveCardsToFoundation,
} from '../moves';

describe('moves', () => {
  describe('visible moves', () => {
    it('should have visible moves', () => {
      const cards = [
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
      ];

      const result = checkVisibleMoves(cards);

      expect(result).toBe(true);
    });

    it('should not have visible moves', () => {
      const cards = [
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
            visible: false,
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
      ];

      const result = checkVisibleMoves(cards);

      expect(result).toBe(false);
    });

    it('should not have visible move in empty column', () => {
      const cards = [
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
            visible: false,
          },
          {
            id: 3,
            suit: '♦',
            order: 8,
            visible: true,
          },
        ],
        [],
      ];

      const result = checkVisibleMoves(cards);

      expect(result).toBe(false);
    });
  });

  describe('king moves', () => {
    it('should have king move in empty column', () => {
      const cards = [
        [
          {
            id: 1,
            value: 'Q',
          },
          {
            id: 2,
            value: 'K',
            visible: true,
          },
        ],
        [],
      ];

      const result = checkKingMoves(cards);

      expect(result).toBe(true);
    });

    it('should not have king move in empty column', () => {
      const cards = [
        [
          {
            id: 1,
            value: 'K',
            visible: true,
          },
          {
            id: 2,
            value: 'Q',
          },
        ],
        [],
      ];

      const result = checkKingMoves(cards);

      expect(result).toBe(false);
    });

    it('should not have king move in same column', () => {
      const cards = [
        [
          {
            id: 1,
            value: 'K',
            visible: true,
          },
        ],
        [
          {
            id: 2,
            value: 'Q',
          },
        ],
      ];

      const result = checkKingMoves(cards);

      expect(result).toBe(false);
    });

    it('should not have non-king move in empty column', () => {
      const cards = [
        [
          {
            id: 1,
            value: 'J',
            visible: true,
          },
          {
            id: 2,
            value: 'Q',
          },
        ],
        [],
      ];

      const result = checkKingMoves(cards);

      expect(result).toBe(false);
    });
  });

  describe('foundation moves', () => {
    it('should have intial Ace foundation move', () => {
      const cards = [
        [
          {
            id: 1,
            suit: '♠',
            value: 'A',
          },
        ],
      ];

      const foundation = [];

      const result = checkFoundationMoves(cards, foundation);

      expect(result).toBe(true);
    });

    it('should have Ace foundation move', () => {
      const cards = [
        [
          {
            id: 1,
            suit: '♠',
            value: 'A',
          },
        ],
      ];

      const foundation = [
        [
          {
            id: 1,
            suit: '♦',
            value: 'A',
          },
        ],
      ];

      const result = checkFoundationMoves(cards, foundation);

      expect(result).toBe(true);
    });

    it('should have a non-ace foundation move', () => {
      const cards = [
        [
          {
            id: 2,
            suit: '♠',
            order: 2,
          },
        ],
      ];

      const foundation = [
        [
          {
            id: 1,
            suit: '♠',
            order: 1,
          },
        ],
      ];

      const result = checkFoundationMoves(cards, foundation);

      expect(result).toBe(true);
    });

    it('should not have any foundation moves', () => {
      const cards = [
        [
          {
            id: 2,
            suit: '♠',
            order: 3,
          },
        ],
      ];

      const foundation = [
        [
          {
            id: 1,
            suit: '♠',
            order: 1,
          },
        ],
      ];

      const result = checkFoundationMoves(cards, foundation);

      expect(result).toBe(false);
    });
  });

  describe('move cards from', () => {
    it('should return correct object', () => {
      const state = {
        cards: [
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
        selectedCardId: 3,
      };

      const result = getMoveCardsFromBoard(state);

      expect(result).toStrictEqual({
        columnCards: [
          { id: 1, order: 3, suit: '♠' },
          { id: 2, order: 8, suit: '♠', visible: true },
        ],
        columnNo: 0,
      });
    });
  });

  describe('move cards to', () => {
    it('should return correct object', () => {
      const state = {
        cards: [
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

      const result = getMoveCardsToBoard(state, selectedColumn);

      expect(result).toStrictEqual({
        columnCards: [
          {
            id: 4,
            order: 9,
            suit: '♠',
            visible: true,
          },
          {
            id: 2,
            order: 8,
            suit: '♠',
            visible: true,
          },
          {
            id: 3,
            order: 8,
            suit: '♦',
            visible: true,
          },
        ],
        columnNo: 1,
      });
    });
  });

  describe('move cards to foundation', () => {
    it('should return correct object', () => {
      const state = {
        cards: [
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
        foundation: [[]],
        selectedCardId: 3,
      };

      const selectedColumn = 0;

      const result = getMoveCardsToFoundation(state, selectedColumn);

      expect(result).toStrictEqual({
        columnCards: [
          {
            id: 3,
            suit: '♦',
            value: 'A',
            visible: true,
          },
        ],
        columnNo: 0,
      });
    });
  });
});
