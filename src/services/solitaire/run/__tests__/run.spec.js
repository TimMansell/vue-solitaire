import { runGameMoves } from '../run';

import fullGameLongDeck from '../../../../../tests/fixtures/decks/fullGameLong.json';
import fullGameLongMoves from '../../../../../tests/fixtures/moves/fullGameLong.json';
import incompleteGameDeck from '../../../../../tests/fixtures/decks/incompleteGame.json';
import incompleteGameMoves from '../../../../../tests/fixtures/moves/incompleteGame.json';

describe('run', () => {
  describe('runGameMoves', () => {
    it('should return complete game', () => {
      const { cards, foundation } = runGameMoves(
        fullGameLongMoves,
        fullGameLongDeck
      );

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
