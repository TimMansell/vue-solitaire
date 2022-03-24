import { checkGameState } from '../index';

import fullGameLongDeck from '../../../../../tests/fixtures/decks/fullGameLong.json';
import fullGameLongMoves from '../../../../../tests/fixtures/moves/fullGameLong.json';
import incompleteGameDeck from '../../../../../tests/fixtures/decks/incompleteGame.json';
import incompleteGameMoves from '../../../../../tests/fixtures/moves/incompleteGame.json';
import quitGameDeck from '../../../../../tests/fixtures/decks/quitGame.json';
import quitGameMoves from '../../../../../tests/fixtures/moves/quitGame.json';

describe('run', () => {
  describe('checkGameState', () => {
    it('should win game', () => {
      const { isGameFinished, hasMoves } = checkGameState(
        fullGameLongMoves,
        fullGameLongDeck
      );

      expect(isGameFinished).toBe(true);
      expect(hasMoves).toBe(false);
    });

    it('should lose game', () => {
      const { isGameFinished, hasMoves } = checkGameState(
        incompleteGameMoves,
        incompleteGameDeck
      );

      expect(isGameFinished).toBe(false);
      expect(hasMoves).toBe(false);
    });

    it('should quit game', () => {
      const { isGameFinished, hasMoves } = checkGameState(
        quitGameMoves,
        quitGameDeck
      );

      expect(isGameFinished).toBe(false);
      expect(hasMoves).toBe(true);
    });
  });
});
