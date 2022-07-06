import { runGameMoves } from '../run';

import fullGameDeck from '../../fixtures/decks/fullGame.json';
import fullGameMoves from '../../fixtures/moves/fullGame.json';
import incompleteGameDeck from '../../fixtures/decks/incompleteGame.json';
import incompleteGameMoves from '../../fixtures/moves/incompleteGame.json';

describe('run', () => {
  describe('runGameMoves', () => {
    it('should return complete game', () => {
      const { cards, foundation } = runGameMoves(fullGameMoves, fullGameDeck);

      expect(cards.flat()).toHaveLength(0);
      expect(foundation.flat()).toHaveLength(52);
    });

    it('should return incomplete game', () => {
      const { cards, foundation } = runGameMoves(
        incompleteGameMoves,
        incompleteGameDeck
      );

      expect(cards.flat()).toHaveLength(50);
      expect(foundation.flat()).toHaveLength(2);
    });
  });
});
