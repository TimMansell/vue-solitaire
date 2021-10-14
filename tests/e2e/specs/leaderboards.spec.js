import { mockUid } from '../../../src/mockData';

describe('Leaderboards', () => {
  afterEach(() => {
    cy.clearTest();
  });

  describe('Default', () => {
    beforeEach(() => {
      cy.visitApp();
    });

    it('should not show game paused if leaderboards overlay is visible', () => {
      cy.setVisibilityHidden();

      cy.showLeaderboards();

      cy.triggerVisibilityChange();

      cy.checkGameIsPaused(false);
    });

    it('it should display correct data', () => {
      cy.showLeaderboards();

      cy.checkLeaderboards();

      cy.selectLeaderboardBest('times');

      cy.checkLeaderboards();

      cy.selectLeaderboardTop(50);

      cy.checkLeaderboards();
    });

    it('it should display correct heading', () => {
      cy.showLeaderboards();

      cy.checkLeaderboardHeading('Top 25 Best Moves');

      cy.selectLeaderboardBest('times');

      cy.checkLeaderboardHeading('Top 25 Best Times');

      cy.selectLeaderboardTop(50);

      cy.checkLeaderboardHeading('Top 50 Best Times');
    });

    it('it should display correct amount of table rows', () => {
      cy.showLeaderboards();

      cy.checkTableHasRowLength(25);

      cy.selectLeaderboardTop(50);

      cy.checkTableHasRowLength(50);
    });

    it('it should display correct table heading', () => {
      cy.showLeaderboards();

      cy.checkTableHeading({ cell: 3, heading: 'Moves' });

      cy.selectLeaderboardBest('times');

      cy.checkTableHeading({ cell: 3, heading: 'Times' });
    });

    it('should show correct data from url params', () => {
      const best = 'times';
      const top = 100;

      cy.visit(`#/leaderboards/${best}/${top}`);

      cy.checkSelectLeaderboardBest(best);
      cy.checkSelectLeaderboardTop(top);

      cy.checkLeaderboardHeading('Top 100 Best Times');

      cy.checkTableHeading({ cell: 3, heading: 'Times' });

      cy.checkLeaderboardGameRange();
    });

    it('it should set filters to default params', () => {
      cy.visit('#/leaderboards/abc/5000');

      cy.checkSelectLeaderboardBest('moves');
      cy.checkSelectLeaderboardTop(25);

      cy.checkLeaderboardHeading('Top 25 Best Moves');

      cy.checkTableHeading({ cell: 3, heading: 'Moves' });

      cy.url().should('include', '#/leaderboards/moves/25');
    });
  });

  describe('New User', () => {
    beforeEach(() => {
      cy.visitApp();
    });

    it('it should display player name after first game', () => {
      cy.showLeaderboards();

      cy.checkLeaderboardNameExists(false);

      cy.closeOverlay();

      cy.startNewGame();

      cy.showLeaderboards();

      cy.checkLeaderboardNameExists(true);
    });
  });

  describe('Existing User', () => {
    beforeEach(() => {
      cy.setUser(mockUid);

      cy.visitApp();
    });

    it('it should display player name ', () => {
      cy.showLeaderboards();

      cy.checkLeaderboardNameExists(true);
    });
  });
});
