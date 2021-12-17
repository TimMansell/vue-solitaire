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
      cy.setDeck(fullGameDeck).then(() => {
        cy.visitApp();
      });
    });

    it('should win game, keep state on page refresh, and increment won game stats', () => {
      cy.saveStats();

      cy.runGameWithClicks(fullGameMoves);

      cy.checkGameWon(true);

      cy.checkTimerIsPausedOnReload();

      cy.checkGameWon(true);

      cy.wait(5000);

      cy.confirmNewGame();

      cy.checkStatsHaveIncremented({
        completed: true,
        won: true,
        lost: false,
        quit: false,
      });
    });
  });

  describe('Existing User', () => {
    beforeEach(() => {
      cy.setUser(mockUid);

      cy.setDeck(fullGameDeck).then(() => {
        cy.visitApp();
      });
    });

    it('should win game, keep state on page refresh, and increment won game stats', () => {
      cy.saveStats();

      cy.runGameWithClicks(fullGameMoves);

      cy.checkGameWon(true);

      cy.checkTimerIsPausedOnReload();

      cy.checkGameWon(true);

      cy.confirmNewGame();

      cy.checkStatsHaveIncremented({
        completed: true,
        won: true,
        lost: false,
        quit: false,
      });
    });
  });
});
