import {
  checkValidCardMove,
  checkHasMoves,
  checkInitialBoardMoves,
  moveCards,
  checkValidFoundationMove,
  moveCardsToFoundation,
  getDraggedCards,
} from '../index';

import noMovesDeck from '../../../../../tests/fixtures/decks/initialNoMoves.json';
import aceMoveDeck from '../../../../../tests/fixtures/decks/initialAceMove.json';
import moveDeck from '../../../../../tests/fixtures/decks/initialMove.json';

describe('moves', () => {
  describe('valid moves', () => {
    it('should have valid moves', () => {
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

      const result = checkValidCardMove(state, selectedColumn);

      expect(result).toBe(true);
    });

    it('should not have valid moves', () => {
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
              order: 10,
              visible: true,
            },
          ],
        ],
        selectedCardId: 2,
      };

      const selectedColumn = 1;

      const result = checkValidCardMove(state, selectedColumn);

      expect(result).toBe(false);
    });

    it('should have valid ace foundation moves', () => {
      const state = {
        cards: [
          [
            {
              id: 1,
              suit: '♦',
              value: 'A',
              visible: true,
            },
          ],
        ],
        foundation: [[], [], [], []],
        selectedCardId: 1,
      };

      const selectedColumn = 0;

      const result = checkValidFoundationMove(state, selectedColumn);

      expect(result).toBe(true);
    });

    it('should have valid non-ace foundation moves', () => {
      const state = {
        cards: [
          [
            {
              id: 1,
              suit: '♠',
              order: 2,
              value: 2,
            },
          ],
        ],
        foundation: [
          [
            {
              id: 2,
              suit: '♠',
              order: 1,
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

      const result = checkValidFoundationMove(state, selectedColumn);

      expect(result).toBe(true);
    });

    it('should not have valid ace foundation move', () => {
      const state = {
        cards: [
          [
            {
              id: 1,
              suit: '♦',
              value: 'A',
              order: 1,
            },
          ],
        ],
        foundation: [
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

      const result = checkValidFoundationMove(state, selectedColumn);

      expect(result).toBe(false);
    });

    it('should not have valid non-ace to ace foundation move', () => {
      const state = {
        cards: [
          [
            {
              id: 1,
              suit: '♦',
              value: 2,
              order: 2,
            },
          ],
        ],
        foundation: [
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

      const result = checkValidFoundationMove(state, selectedColumn);

      expect(result).toBe(false);
    });

    it('should not have valid non-ace to empty foundation column move', () => {
      const state = {
        cards: [
          [
            {
              id: 1,
              suit: '♦',
              value: 3,
              order: 3,
            },
          ],
        ],
        foundation: [
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

      const result = checkValidFoundationMove(state, selectedColumn);

      expect(result).toBe(false);
    });
  });

  describe('has moves', () => {
    it('should have moves', () => {
      const state = {
        cards: [
          [
            {
              id: 1,
              value: 'A',
              suit: '♣',
              visible: true,
            },
          ],
        ],
        foundation: [],
      };

      const result = checkHasMoves(state);

      expect(result).toBe(true);
    });

    it('should have no moves', () => {
      const state = {
        cards: [
          [
            {
              id: 1,
              value: 'K',
              visible: true,
            },
          ],
        ],
        foundation: [],
      };

      const result = checkHasMoves(state);

      expect(result).toBe(false);
    });
  });

  describe('Initial board moves', () => {
    it('should have board moves', () => {
      const result = checkInitialBoardMoves(moveDeck);

      expect(result).toEqual(true);
    });

    it('should have Ace board move', () => {
      const result = checkInitialBoardMoves(aceMoveDeck);

      expect(result).toBe(true);
    });

    it('should have no board moves', () => {
      const result = checkInitialBoardMoves(noMovesDeck);

      expect(result).toBe(false);
    });
  });

  describe('moves', () => {
    it('move board cards', () => {
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

      const result = moveCards(state, selectedColumn);

      expect(result).toStrictEqual({
        cards: [
          [{ id: 1, order: 3, suit: '♠', visible: true }],
          [
            { id: 4, order: 9, suit: '♠', visible: true },
            { id: 2, order: 8, suit: '♠', visible: true },
            { id: 3, order: 8, suit: '♦', visible: true },
          ],
        ],
      });
    });

    it('move foundation cards', () => {
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

      const result = moveCardsToFoundation(state, selectedColumn);

      expect(result).toStrictEqual({
        cards: [
          [
            { id: 1, suit: '♠', value: 3 },
            { id: 2, suit: '♠', value: 8, visible: true },
          ],
        ],
        foundation: [[{ id: 3, suit: '♦', value: 'A', visible: true }]],
      });
    });
  });

  it('should get dragged cards from position', () => {
    const state = {
      cards: [
        [
          {
            id: 1,
            suit: '♠',
            value: 'A',
          },
        ],
        [
          {
            id: 2,
            suit: '♠',
            value: 2,
          },
          {
            id: 3,
            suit: '♠',
            value: 3,
          },
          {
            id: 4,
            suit: '♠',
            value: 4,
          },
        ],
      ],
    };

    const selectedCardId = 3;

    const result = getDraggedCards(state, selectedCardId);

    expect(result).toStrictEqual([
      { id: 3, suit: '♠', value: 3 },
      { id: 4, suit: '♠', value: 4 },
    ]);
  });
});
