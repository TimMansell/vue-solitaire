import fullGameDeck from '../../fixtures/decks/fullGame.json';
import fullGameMoves from '../../fixtures/moves/fullGame.json';
import { mockUid, mockNewUid } from '../../../src/mockData';

describe('Timer', () => {
  afterEach(() => {
    cy.clearTest();
  });

  describe('New User', () => {
    it('should win game, keep state on page refresh, and increment won game stats', () => {
      cy.task('clearUser', mockNewUid);

      localStorage.setItem('luid', mockNewUid);

      cy.task('populateDeck', [fullGameDeck, mockNewUid]);

      cy.mockApi({
        mockDeck: fullGameDeck,
      });

      cy.visitApp();

      cy.saveStats();
      cy.saveGames();

      cy.runGameWithClicks(fullGameMoves);

      cy.checkGameWon();

      cy.checkReloadTimer();

      cy.checkGameWon();

      cy.confirmNewGame({ waitUser: true });

      cy.showStats();

      cy.checkAllStats({ played: true, won: true });
    });
  });

  describe('Existing User', () => {
    it('should win game, keep state on page refresh, and increment won game stats', () => {
      localStorage.setItem('luid', mockUid);

      cy.task('populateDeck', [fullGameDeck, mockUid]);

      cy.mockApi({
        mockDeck: fullGameDeck,
      });

      cy.visitApp();

      cy.saveStats();
      cy.saveGames();

      cy.runGameWithClicks(fullGameMoves);

      cy.checkGameWon();

      cy.checkReloadTimer();

      cy.checkGameWon();

      cy.confirmNewGame();

      cy.showStats();

      cy.checkAllStats({ played: true, won: true });
    });
  });
});
