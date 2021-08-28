import { mockUid } from '../../../src/mockData';

describe('Leaderboards', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  describe('Default', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('should not show game paused if leaderboards overlay is visible', () => {
      cy.document().then((doc) => {
        cy.stub(doc, 'visibilityState').value('hidden');
      });

      cy.get('[data-test="leaderboards-btn"]').click();

      cy.document().trigger('visibilitychange');

      cy.get('[data-test="game-paused"]').should('not.exist');
    });

    it('it should display correct heading', () => {
      cy.get('[data-test="leaderboards-btn"]').click();

      cy.get('[data-test="leaderboards-heading"]')
        .as('heading')
        .should('contain', 'Top 25 Best Moves');

      cy.get('[data-test="leaderboard-set-best"] [data-test="select"]').select(
        'Times'
      );

      cy.get('@heading').should('contain', 'Top 25 Best Times');

      cy.get('[data-test="leaderboard-set-top"] [data-test="select"]').select(
        '50'
      );

      cy.get('@heading').should('contain', 'Top 50 Best Times');
    });

    it('it should display correct amount of table rows', () => {
      cy.interceptLeaderboardAPI();

      cy.get('[data-test="leaderboards-btn"]').click();

      cy.wait('@waitForLeaderboardAPI');

      cy.get('[data-test="table-row"]').should('have.length', 25);

      cy.get('[data-test="leaderboard-set-top"] [data-test="select"]').select(
        '50'
      );

      cy.wait('@waitForLeaderboardAPI');

      cy.get('[data-test="table-row"]').should('have.length', 50);
    });

    it('it should display correct table heading', () => {
      cy.get('[data-test="leaderboards-btn"]').click();

      cy.get('[data-test="table-header-row"] th')
        .eq(3)
        .as('row')
        .should('contain', 'Moves');

      cy.get('[data-test="leaderboard-set-best"] [data-test="select"]').select(
        'Times'
      );

      cy.get('@row').should('contain', 'Times');
    });
  });

  describe('New User', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('it should display player name after first game', () => {
      cy.interceptCreateUserAPI();

      cy.get('[data-test="leaderboards-btn"]').click();

      cy.get('[data-test="leaderboard-name"]').should('not.exist');

      cy.get('[data-test="game-overlay-close"]').click();

      cy.get('[data-test="new-game-btn"]').click();

      cy.get('[data-test="game-new"]').within(() => {
        cy.get('[data-test="new-game-btn"]').click();
      });

      cy.wait('@waitForCreateUserAPI');

      cy.get('[data-test="leaderboards-btn"]').click();

      cy.get('[data-test="leaderboard-name"]').should('exist');
    });
  });

  describe('Existing User', () => {
    beforeEach(() => {
      localStorage.setItem('luid', mockUid);

      cy.visit('/');
    });

    it('it should display player name after first game', () => {
      cy.get('[data-test="leaderboards-btn"]').click();

      cy.get('[data-test="leaderboard-name"]').should('exist');
    });
  });
});
