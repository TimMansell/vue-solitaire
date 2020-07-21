import { checkVisibleMoves, checkKingMoves, checkFoundationMoves } from '../moves';

describe('moves', () => {
  describe('visible moves', () => {
    it('should have visible moves', () => {
      const boardCards = [
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
      ];

      const result = checkVisibleMoves(boardCards);

      expect(result).toHaveLength(1);
    });

    it('should not have visible moves', () => {
      const boardCards = [
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
            visible: false,
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
      ];

      const result = checkVisibleMoves(boardCards);

      expect(result).toHaveLength(0);
    });

    it('should not have visible move in empty column', () => {
      const boardCards = [
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
            visible: false,
          },
          {
            id: 3,
            suit: 'd',
            order: 8,
            visible: true,
          },
        ],
        [],
      ];

      const result = checkVisibleMoves(boardCards);

      expect(result).toHaveLength(0);
    });
  });

  describe('king moves', () => {
    it('should have king move in empty column', () => {
      const boardCards = [
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

      const result = checkKingMoves(boardCards);

      expect(result).toHaveLength(1);
    });

    it('should not have king move in empty column', () => {
      const boardCards = [
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

      const result = checkKingMoves(boardCards);

      expect(result).toHaveLength(0);
    });

    it('should not have king move in same column', () => {
      const boardCards = [
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

      const result = checkKingMoves(boardCards);

      expect(result).toHaveLength(0);
    });

    it('should not have non-king move in empty column', () => {
      const boardCards = [
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

      const result = checkKingMoves(boardCards);

      expect(result).toHaveLength(0);
    });
  });

  describe('foundation moves', () => {
    it('should have intial Ace foundation move', () => {
      const boardCards = [
        [
          {
            id: 1,
            suit: 's',
            value: 'A',
          },
        ],
      ];

      const foundationCards = [];

      const result = checkFoundationMoves(boardCards, foundationCards);

      expect(result).toHaveLength(1);
    });

    it('should have Ace foundation move', () => {
      const boardCards = [
        [
          {
            id: 1,
            suit: 's',
            value: 'A',
          },
        ],
      ];

      const foundationCards = [
        [
          {
            id: 1,
            suit: 'd',
            value: 'A',
          },
        ],
      ];

      const result = checkFoundationMoves(boardCards, foundationCards);

      expect(result).toHaveLength(1);
    });

    it('should have a non-ace foundation move', () => {
      const boardCards = [
        [
          {
            id: 2,
            suit: 's',
            order: 2,
          },
        ],
      ];

      const foundationCards = [
        [
          {
            id: 1,
            suit: 's',
            order: 1,
          },
        ],
      ];

      const result = checkFoundationMoves(boardCards, foundationCards);

      expect(result).toHaveLength(1);
    });

    it('should not have any foundation moves', () => {
      const boardCards = [
        [
          {
            id: 2,
            suit: 's',
            order: 3,
          },
        ],
      ];

      const foundationCards = [
        [
          {
            id: 1,
            suit: 's',
            order: 1,
          },
        ],
      ];

      const result = checkFoundationMoves(boardCards, foundationCards);

      expect(result).toHaveLength(0);
    });
  });
});
