import fullGameDeck from '../../fixtures/decks/fullGame.json';
import { mockUid } from '../../../src/mockData';

describe('Stats', () => {
  afterEach(() => {
    cy.clearTest();
  });

  describe('Default', () => {
    beforeEach(() => {
      cy.mockApi({
        mockDeck: fullGameDeck,
        mockInitial: true,
        mockSaveGame: true,
        mockCreateUser: true,
        mockGetUser: true,
      });

      cy.visitApp();
    });

    it('should not show game paused if user stats overlay is visible', () => {
      cy.setVisibilityHidden();

      cy.showStats();

      cy.triggerVisibilityChange();

      cy.checkGamePaused(false);
    });

    it('it successfully retrieves player count', () => {
      cy.savePlayerCount();

      cy.checkPlayerCount({ equal: false });
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

      cy.checkStats({ stat: 'user', values: [0, 0, 0, 0] });
      cy.checkStats({ stat: 'global', values: [0, 0, 0, 0], not: true });
    });

    it('it successfully increments games played', () => {
      cy.saveStats();
      cy.saveGames();

      cy.startNewGame();

      cy.checkAllStats({ played: true, quit: true });
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

      cy.checkStats({ stat: 'user', values: [0, 0, 0, 0], not: true });
      cy.checkStats({ stat: 'global', values: [0, 0, 0, 0], not: true });
    });

    it('it successfully increments games played', () => {
      cy.saveStats();
      cy.saveGames();

      cy.startNewGame();

      cy.checkAllStats({ played: true, quit: true });
    });
  });
});
