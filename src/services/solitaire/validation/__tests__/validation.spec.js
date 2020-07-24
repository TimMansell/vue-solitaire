import {
  isMoveValidCard,
  isMoveValidSuit,
  isMoveValidOrder,
  isMoveValidColumn,
  isMoveValidKing,
  isFoundationMoveValidPosition,
  isFoundationMoveValidSuit,
  isFoundationMoveValidOrder,
  isFoundationMoveValidAce,
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

      const result = isFoundationMoveValidPosition(card, cards);

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

      const result = isFoundationMoveValidPosition(card, cards);

      expect(result).toBe(false);
    });
  });

  describe('valid king', () => {
    it('should be a valid king', () => {
      const card1 = {
        value: 'K',
      };
      const card2 = {};

      const result = isMoveValidKing(card1, card2);

      expect(result).toBe(true);
    });

    it('should be an invalid king', () => {
      const card1 = {
        value: 'Q',
      };
      const card2 = {};

      const result = isMoveValidKing(card1, card2);

      expect(result).toBe(false);
    });

    it('should be an invalid card', () => {
      const card1 = {
        value: 'Q',
      };

      const result = isMoveValidKing(card1);

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

      const result = isFoundationMoveValidSuit(card, cards);

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

      const result = isFoundationMoveValidSuit(card, cards);

      expect(result).toBe(false);
    });
  });

  describe('valid foundation order', () => {
    it('should be a valid empty order', () => {
      const card = {
        order: 0,
      };

      const cards = [];

      const result = isFoundationMoveValidOrder(card, cards);

      expect(result).toBe(true);
    });

    it('should be a valid order', () => {
      const card = {
        order: 2,
      };

      const cards = [{}, {}];

      const result = isFoundationMoveValidOrder(card, cards);

      expect(result).toBe(true);
    });

    it('should be an invalid order', () => {
      const card = {
        order: 5,
      };

      const cards = [{}];

      const result = isFoundationMoveValidOrder(card, cards);

      expect(result).toBe(false);
    });
  });

  describe('valid ace', () => {
    it('should be a valid ace', () => {
      const card = {
        value: 'A',
      };
      const cards = [];

      const result = isFoundationMoveValidAce(card, cards);

      expect(result).toBe(true);
    });

    it('should be an invalid card', () => {
      const card = {
        value: 'Q',
      };
      const cards = [];

      const result = isFoundationMoveValidAce(card, cards);

      expect(result).toBe(false);
    });
  });
});
