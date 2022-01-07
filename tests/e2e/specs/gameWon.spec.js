import fullGameDeck from '../../fixtures/decks/fullGame.json';
import fullGameMoves from '../../fixtures/moves/fullGame.json';
import { mockUid } from '../../../src/mockData';

describe('Game Won', () => {
  afterEach(() => {
    cy.clearTest();
  });

  describe('Default', () => {
    it('it should not show won page if game is not won', () => {
      cy.visitApp();
      cy.visit('#/won');

      cy.checkGameWon(false);
    });

    it('should win game, keep state on page refresh', () => {
      cy.setDeck(fullGameDeck).then(() => {
        cy.visitApp();
      });

      cy.runGameWithClicks(fullGameMoves);

      cy.checkGameWon(true);

      cy.checkTimerIsPausedOnReload();

      cy.checkGameWon(true);
    });
  });

  describe('New User', () => {
    beforeEach(() => {
      cy.setDeck(fullGameDeck).then(() => {
        cy.visitApp();
      });
    });

    it('should win game and increment won game stats', () => {
      cy.saveStats();

      cy.runGameWithClicks(fullGameMoves);

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

    it('should win game and increment won game stats', () => {
      cy.saveStats();

      cy.runGameWithClicks(fullGameMoves);

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
