import { checkGameState } from '../index';

import fullGameDeck from '../../../../../tests/fixtures/decks/fullGame.json';
import fullGameMoves from '../../../../../tests/fixtures/moves/fullGame.json';
import incompleteGameDeck from '../../../../../tests/fixtures/decks/incompleteGame.json';
import incompleteGameMoves from '../../../../../tests/fixtures/moves/incompleteGame.json';
import quitGameDeck from '../../../../../tests/fixtures/decks/quitGame.json';
import quitGameMoves from '../../../../../tests/fixtures/moves/quitGame.json';

describe('run', () => {
  describe('checkGameState', () => {
    it('should be won game', () => {
      const { isGameFinished, hasMoves } = checkGameState(
        fullGameMoves,
        fullGameDeck
      );

      expect(isGameFinished).toBe(true);
      expect(hasMoves).toBe(false);
    });

    it('should be lost game', () => {
      const { isGameFinished, hasMoves } = checkGameState(
        incompleteGameMoves,
        incompleteGameDeck
      );

      expect(isGameFinished).toBe(false);
      expect(hasMoves).toBe(false);
    });

    it('should be quit game', () => {
      const { isGameFinished, hasMoves } = checkGameState(
        quitGameMoves,
        quitGameDeck
      );

      expect(isGameFinished).toBe(false);
      expect(hasMoves).toBe(true);
    });
  });
});
