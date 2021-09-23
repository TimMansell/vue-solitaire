import fullGameDeck from '../../fixtures/decks/fullGame.json';
import { mockUid } from '../../../src/mockData';

describe('Stats', () => {
  afterEach(() => {
    cy.clearTest();
  });

  describe('Default', () => {
    beforeEach(() => {
      cy.visitApp();
    });

    it('should not show game paused if user stats overlay is visible', () => {
      cy.setVisibilityHidden();

      cy.showStats();

      cy.triggerVisibilityChange();

      cy.checkGamePaused(false);
    });

    it('it successfully retrieves player count', () => {
      cy.checkPlayerCount();
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

    it('it successfully retrieves 0 games played', () => {
      cy.checkGameNumber({ number: 0 });

      cy.showStats();

      cy.checkUserStats({ played: 0, won: 0, lost: 0, quit: 0 });

      cy.checkGlobalStats({
        played: 0,
        won: 0,
        lost: 0,
        quit: 0,
        shouldEqual: false,
      });
    });

    it('it successfully increments games played', () => {
      cy.saveStats();
      cy.saveGames();

      cy.startNewGame();

      cy.checkIncrementedStats({ played: true, quit: true });
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

    it('it successfully retrieves games played', () => {
      cy.checkGameNumber({ number: 0, shouldEqual: false });

      cy.showStats();

      cy.checkUserStats({
        played: 0,
        won: 0,
        lost: 0,
        quit: 0,
        shouldEqual: false,
      });

      cy.checkGlobalStats({
        played: 0,
        won: 0,
        lost: 0,
        quit: 0,
        shouldEqual: false,
      });
    });

    it('it successfully increments games played', () => {
      cy.saveStats();
      cy.saveGames();

      cy.startNewGame();

      cy.checkIncrementedStats({ played: true, quit: true });
    });
  });
});
