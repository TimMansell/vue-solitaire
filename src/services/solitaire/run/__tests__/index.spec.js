import { checkGameState } from '../index';

import fullGameDeck from '../../fixtures/decks/fullGame.json';
import fullGameMoves from '../../fixtures/moves/fullGame.json';
import incompleteGameDeck from '../../fixtures/decks/incompleteGame.json';
import incompleteGameMoves from '../../fixtures/moves/incompleteGame.json';
import quitGameDeck from '../../fixtures/decks/quitGame.json';
import quitGameMoves from '../../fixtures/moves/quitGame.json';

describe('run', () => {
  describe('checkGameState', () => {
    it('should be won game', () => {
      const { won, lost, moves } = checkGameState({
        cards: fullGameDeck,
        moves: fullGameMoves,
      });

      expect(won).toBe(true);
      expect(lost).toBe(false);
      expect(moves).toBe(fullGameMoves.length);
    });

    it('should be lost game', () => {
      const { won, lost, moves } = checkGameState({
        cards: incompleteGameDeck,
        moves: incompleteGameMoves,
      });

      expect(won).toBe(false);
      expect(lost).toBe(true);
      expect(moves).toBe(incompleteGameMoves.length);
    });

    it('should be quit game', () => {
      const { won, lost, moves } = checkGameState({
        cards: quitGameDeck,
        moves: quitGameMoves,
      });

      expect(won).toBe(false);
      expect(lost).toBe(false);
      expect(moves).toBe(quitGameMoves.length);
    });
  });
});
