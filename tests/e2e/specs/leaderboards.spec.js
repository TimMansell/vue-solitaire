import { cy } from 'date-fns/locale';
import { mockUid } from '../../../src/mockData';

describe('Leaderboards', () => {
  afterEach(() => {
    cy.clearTest();

    cy.interceptLeaderboardAPI();
  });

  describe('Default', () => {
    beforeEach(() => {
      cy.visitApp();
    });

    it('should not show game paused if leaderboards overlay is visible', () => {
      cy.document().then((doc) => {
        cy.stub(doc, 'visibilityState').value('hidden');
      });

      cy.showLeaderboards();

      cy.wait('@waitForLeaderboardAPI');

      cy.document().trigger('visibilitychange');

      cy.get('[data-test="game-paused"]').should('not.exist');
    });

    it('it should display correct heading', () => {
      cy.showLeaderboards();

      cy.wait('@waitForLeaderboardAPI');

      cy.get('[data-test="leaderboards-heading"]')
        .as('heading')
        .should('contain', 'Top 25 Best Moves');

      cy.get('[data-test="leaderboard-set-best"] [data-test="select"]').select(
        'Times'
      );

      cy.wait('@waitForLeaderboardAPI');

      cy.get('@heading').should('contain', 'Top 25 Best Times');

      cy.get('[data-test="leaderboard-set-top"] [data-test="select"]').select(
        '50'
      );

      cy.wait('@waitForLeaderboardAPI');

      cy.get('@heading').should('contain', 'Top 50 Best Times');
    });

    it('it should display correct amount of table rows', () => {
      cy.showLeaderboards();

      cy.wait('@waitForLeaderboardAPI');

      cy.get('[data-test="table-row"]').should('have.length', 25);

      cy.get('[data-test="leaderboard-set-top"] [data-test="select"]').select(
        '50'
      );

      cy.wait('@waitForLeaderboardAPI');

      cy.get('[data-test="table-row"]').should('have.length', 50);
    });

    it('it should display correct table heading', () => {
      cy.showLeaderboards();

      cy.wait('@waitForLeaderboardAPI');

      cy.get('[data-test="table-header-row"] th')
        .eq(3)
        .as('row')
        .should('contain', 'Moves');

      cy.get('[data-test="leaderboard-set-best"] [data-test="select"]').select(
        'Times'
      );
      cy.wait('@waitForLeaderboardAPI');

      cy.get('@row').should('contain', 'Times');
    });
  });

  describe('New User', () => {
    beforeEach(() => {
      cy.visitApp();
    });

    it('it should display player name after first game', () => {
      cy.showLeaderboards();

      cy.wait('@waitForLeaderboardAPI');

      cy.get('[data-test="leaderboard-name"]').should('not.exist');

      cy.closeOverlay();

      cy.startNewGame();

      cy.wait('@waitForCreateUserAPI');

      cy.showLeaderboards();

      cy.wait('@waitForLeaderboardAPI');

      cy.get('[data-test="leaderboard-name"]').should('exist');
    });
  });

  describe('Existing User', () => {
    beforeEach(() => {
      localStorage.setItem('luid', mockUid);

      cy.visitApp();
    });

    it('it should display player name after first game', () => {
      cy.showLeaderboards();

      cy.wait('@waitForLeaderboardAPI');

      cy.get('[data-test="leaderboard-name"]').should('exist');
    });
  });
});
