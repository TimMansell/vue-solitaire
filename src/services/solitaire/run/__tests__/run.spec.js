import { runGameMoves } from '../run';

import fullGameDeck from '../../../../../tests/fixtures/decks/fullGame.json';
import fullGameMoves from '../../../../../tests/fixtures/moves/fullGame.json';
import incompleteGameDeck from '../../../../../tests/fixtures/decks/incompleteGame.json';
import incompleteGameMoves from '../../../../../tests/fixtures/moves/incompleteGame.json';

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

      expect(cards.flat()).toHaveLength(51);
      expect(foundation.flat()).toHaveLength(1);
    });
  });
});
