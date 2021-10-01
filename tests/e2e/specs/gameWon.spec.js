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
    beforeEach(() => {
      cy.mockApi({
        mockDeck: fullGameDeck,
      });

      cy.visitApp();

      cy.setDeck(fullGameDeck);
    });

    it('should win game, keep state on page refresh, and increment won game stats', () => {
      cy.runGameWithClicks(fullGameMoves);

      cy.checkGameWon(true);

      cy.checkTimerIsPausedOnReload();

      cy.checkGameWon(true);

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

      cy.checkGameWon(true);

      cy.checkTimerIsPausedOnReload();

      cy.checkGameWon(true);

      cy.confirmNewGame();

      cy.checkStats();
    });
  });
});
