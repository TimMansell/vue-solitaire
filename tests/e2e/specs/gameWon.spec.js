import fullGameDeck from '../../fixtures/decks/fullGame.json';
import fullGameMoves from '../../fixtures/moves/fullGame.json';
import { mockUid, mockNewUid } from '../../../src/mockData';

describe('Timer', () => {
  afterEach(() => {
    cy.clearTest();
  });

  describe('New User', () => {
    beforeEach(() => {
      cy.setUser(mockNewUid);

      cy.mockApi({
        mockDeck: fullGameDeck,
      });

      cy.visitApp();
    });

    afterEach(() => {
      cy.clearUser({ user: true, games: true, deck: true });
    });

    it('should win game, keep state on page refresh, and increment won game stats', () => {
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
    beforeEach(() => {
      cy.setUser(mockUid);

      cy.mockApi({
        mockDeck: fullGameDeck,
      });

      cy.visitApp();
    });

    afterEach(() => {
      cy.clearUser({ deck: true });
    });

    it('should win game, keep state on page refresh, and increment won game stats', () => {
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
