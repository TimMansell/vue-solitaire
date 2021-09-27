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

      cy.checkGameIsPaused(false);
    });
  });

  describe('New User', () => {
    beforeEach(() => {
      cy.mockApi({
        mockDeck: fullGameDeck,
      });

      cy.visitApp();
    });

    it('it successfully retrieves 0 games played', () => {
      cy.checkStats();
    });

    it('it successfully increments games played', () => {
      cy.setDeck(fullGameDeck);

      cy.startNewGame();

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
    });

    it('it successfully retrieves games played', () => {
      cy.checkStats();
    });

    it('it successfully increments games played', () => {
      cy.setDeck(fullGameDeck);

      cy.startNewGame();

      cy.checkStats();
    });
  });
});
