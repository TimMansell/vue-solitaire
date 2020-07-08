import {
  isMoveValidCard,
  isMoveValidSuit,
  isMoveValidOrder,
  isMoveValidColumn,
  isMoveValidPosition,
  isValidKingMove,
  isMoveValidFoundationSuit,
} from '../validation';

describe('validation', () => {
  describe('valid card', () => {
    it('should be a valid card', () => {
      const card1 = {
        order: 9,
        suit: 'c',
      };
      const card2 = {
        order: 10,
        suit: 'c',
      };
      const result = isMoveValidCard(card1, card2);

      expect(result).toBe(true);
    });

    it('should be an invalid card', () => {
      const card1 = {
        order: 9,
        suit: 'c',
      };
      const card2 = {
        order: 9,
        suit: 'c',
      };
      const result = isMoveValidCard(card1, card2);

      expect(result).toBe(false);
    });
  });

  describe('valid suit', () => {
    it('should be a valid suit', () => {
      const card1 = {
        suit: 'c',
      };
      const card2 = {
        suit: 'c',
      };
      const result = isMoveValidSuit(card1, card2);

      expect(result).toBe(true);
    });

    it('should be an invalid suit', () => {
      const card1 = {
        suit: 'c',
      };
      const card2 = {
        suit: 'd',
      };
      const result = isMoveValidSuit(card1, card2);

      expect(result).toBe(false);
    });
  });

  describe('valid order', () => {
    it('should be a valid order', () => {
      const card1 = {
        order: 3,
      };
      const card2 = {
        order: 4,
      };
      const result = isMoveValidOrder(card1, card2);

      expect(result).toBe(true);
    });

    it('should be an invalid order', () => {
      const card1 = {
        order: 3,
      };
      const card2 = {
        order: 2,
      };
      const result = isMoveValidOrder(card1, card2);

      expect(result).toBe(false);
    });
  });

  describe('valid column', () => {
    it('should be a valid column', () => {
      const card = {
        id: 3,
      };
      const cards = [
        {
          id: 5,
        },
        {
          id: 8,
        },
        {
          id: 7,
        },
      ];

      const result = isMoveValidColumn(card, cards);

      expect(result).toBe(true);
    });

    it('should be an invalid column', () => {
      const card = {
        id: 3,
      };
      const cards = [
        {
          id: 5,
        },
        {
          id: 3,
        },
        {
          id: 7,
        },
      ];

      const result = isMoveValidColumn(card, cards);

      expect(result).toBe(false);
    });
  });

  describe('valid position', () => {
    it('should be a valid position', () => {
      const card = {
        id: 3,
      };
      const cards = [
        [
          {
            id: 5,
          },
          {
            id: 7,
          },
          {
            id: 3,
          },
        ],
      ];

      const result = isMoveValidPosition(card, cards);

      expect(result).toBe(true);
    });

    it('should be an invalid position', () => {
      const card = {
        id: 3,
      };
      const cards = [
        [
          {
            id: 5,
          },
          {
            id: 3,
          },
          {
            id: 7,
          },
        ],
      ];

      const result = isMoveValidPosition(card, cards);

      expect(result).toBe(false);
    });
  });

  describe('valid king', () => {
    it('should be a valid king', () => {
      const card1 = {
        isKing: true,
      };

      const result = isValidKingMove(card1);

      expect(result).toBe(true);
    });

    it('should be an invalid king', () => {
      const card1 = {
        isKing: false,
      };
      const card2 = {};

      const result = isValidKingMove(card1, card2);

      expect(result).toBe(false);
    });

    it('should be an invalid card', () => {
      const card1 = {
        isKing: false,
      };

      const result = isValidKingMove(card1);

      expect(result).toBe(false);
    });
  });

  describe('valid foundation suit', () => {
    it('should be a valid suit', () => {
      const card = {
        suit: 'c',
      };

      const cards = [
        {
          suit: 'c',
        },
      ];

      const result = isMoveValidFoundationSuit(card, cards);

      expect(result).toBe(true);
    });

    it('should be an invalid suit', () => {
      const card = {
        suit: 'c',
      };

      const cards = [
        {
          suit: 'd',
        },
      ];

      const result = isMoveValidFoundationSuit(card, cards);

      expect(result).toBe(false);
    });
  });
});
