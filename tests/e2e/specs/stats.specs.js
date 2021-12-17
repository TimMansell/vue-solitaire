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
      cy.visitApp();
    });

    it('it successfully retrieves 0 games played', () => {
      cy.saveStats();

      cy.checkStatsHaveIncremented({
        complete: false,
        won: false,
        lost: false,
        quit: false,
      });
    });

    it('it successfully increments games played', () => {
      cy.saveStats();

      cy.startNewGame();

      cy.checkStatsHaveIncremented({
        completed: true,
        quit: true,
        won: false,
        lost: false,
      });
    });
  });

  describe('Existing User', () => {
    beforeEach(() => {
      cy.setUser(mockUid);

      cy.visitApp();
    });

    it('it successfully retrieves games played', () => {
      cy.saveStats();

      cy.checkStatsHaveIncremented({
        complete: false,
        won: false,
        lost: false,
        quit: false,
      });
    });

    it('it successfully increments games played', () => {
      cy.saveStats();

      cy.startNewGame();

      cy.checkStatsHaveIncremented({
        completed: true,
        quit: true,
        won: false,
        lost: false,
      });
    });
  });
});
