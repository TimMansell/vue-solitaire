import fullGameDeck from '../../fixtures/decks/fullGame.json';
import fullGameMoves from '../../fixtures/moves/fullGame.json';
import { mockUid } from '../../../src/mockData';

describe('Game Won', () => {
  afterEach(() => {
    cy.clearTest();
  });

  describe('Default', () => {
    beforeEach(() => {
      cy.visitApp();
    });

    it('it should not show won page if game is not won', () => {
      cy.visit('#/won');

      cy.checkGameWon(false);
    });
  });

  describe('New User', () => {
    it('should win game and increment won game stats', () => {
      cy.visitApp();

      cy.setServerDeck(fullGameDeck);

      cy.runGameWithClicks(fullGameMoves);

      cy.checkGameWon(true);

      cy.checkSummaryMoves(fullGameMoves.length);

      cy.confirmNewGame();

      cy.checkStats();
    });
  });

  describe('Existing User', () => {
    it('should win game and increment won game stats', () => {
      cy.setUser(mockUid);

      cy.visitApp();

      cy.setServerDeck(fullGameDeck);

      cy.runGameWithClicks(fullGameMoves);

      cy.checkGameWon(true);

      cy.checkSummaryMoves(fullGameMoves.length);

      cy.confirmNewGame();

      cy.checkStats();
    });
  });
});
