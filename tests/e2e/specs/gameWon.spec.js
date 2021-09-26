import fullGameDeck from '../../fixtures/decks/fullGame.json';
import fullGameMoves from '../../fixtures/moves/fullGame.json';
import { mockUid } from '../../../src/mockData';

describe('Game Won', () => {
  afterEach(() => {
    cy.clearTest();
  });

  describe('New User', () => {
    beforeEach(() => {
      cy.mockApi({
        mockDeck: fullGameDeck,
      });

      cy.visitApp();

      cy.setDeck(fullGameDeck);
    });

    it('should win game, keep state on page refresh, and increment won game stats', () => {
      cy.runGameWithClicks(fullGameMoves);

      cy.checkGameWon();

      cy.checkTimerIsPausedOnReload();

      cy.checkGameWon();

      cy.confirmNewGame({ waitUser: true });

      cy.checkStats();
    });
  });

  describe('Existing User', () => {
    beforeEach(() => {
      cy.setUser(mockUid);

      cy.mockApi({
        mockDeck: fullGameDeck,
      });

      cy.visitApp();

      cy.setDeck(fullGameDeck);
    });

    it('should win game, keep state on page refresh, and increment won game stats', () => {
      cy.runGameWithClicks(fullGameMoves);

      cy.checkGameWon();

      cy.checkTimerIsPausedOnReload();

      cy.checkGameWon();

      cy.confirmNewGame();

      cy.checkStats();
    });
  });
});
