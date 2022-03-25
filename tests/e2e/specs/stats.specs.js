import { mockUid } from '../../../src/mockData';

describe('Stats', () => {
  afterEach(() => {
    cy.clearTest();
  });

  describe('New User', () => {
    beforeEach(() => {
      cy.visitApp();
    });

    it('it retrieves 0 games played and increments after a game has been played', () => {
      cy.checkUserStatsAreZero();

      cy.startNewGame();

      cy.checkStats();
    });
  });

  describe('Existing User', () => {
    beforeEach(() => {
      cy.setUser(mockUid);

      cy.visitApp();
    });

    it('it retrieves stats and increments after a game has been played', () => {
      cy.checkStats();

      cy.startNewGame();

      cy.checkStats();
    });
  });
});
