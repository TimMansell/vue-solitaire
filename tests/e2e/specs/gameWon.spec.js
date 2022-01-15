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

    it('should win game, keep state on page refresh', () => {
      cy.setServerDeck(fullGameDeck);

      cy.runGameWithClicks(fullGameMoves);

      cy.checkGameWon(true);

      cy.checkTimerIsPausedOnReload();

      cy.checkGameWon(true);
    });
  });

  describe('New User', () => {
    it('should win game and increment won game stats', () => {
      cy.visitApp();

      cy.setServerDeck(fullGameDeck);

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
    it('should win game and increment won game stats', () => {
      cy.setUser(mockUid);

      cy.visitApp();

      cy.setServerDeck(fullGameDeck);

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
