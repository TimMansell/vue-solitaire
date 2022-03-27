describe('Leaderboards', () => {
  describe('Default', () => {
    beforeEach(() => {
      cy.visitApp();
    });

    it('it should display correct headings', () => {
      cy.showLeaderboards();

      cy.checkLeaderboardHeading('Top 25 Lowest Moves');
      cy.checkTableHeading({ cell: 3, heading: 'Moves' });

      cy.selectLeaderboardBest('Times');

      cy.checkLeaderboardHeading('Top 25 Quickest Times');
      cy.checkTableHeading({ cell: 3, heading: 'Times' });

      cy.selectLeaderboardBest('Win %');

      cy.checkLeaderboardHeading('Top 25 Best Win %');
      cy.checkTableHeading({ cell: 2, heading: 'Win %' });

      cy.selectLeaderboardBest('Wins');

      cy.checkLeaderboardHeading('Top 25 Most Wins');
      cy.checkTableHeading({ cell: 2, heading: 'Wins' });

      cy.selectLeaderboardTop(50);

      cy.checkLeaderboardHeading('Top 50 Most Wins');
    });

    it('it should display correct amount of table rows', () => {
      cy.showLeaderboards();

      cy.checkLeaderboardGameRange();

      cy.selectLeaderboardTop(50);

      cy.checkLeaderboardGameRange();
    });

    it('should show correct data from url params', () => {
      cy.visit(`#/leaderboards/time/100`);

      cy.checkSelectLeaderboardBest('Times');
      cy.checkSelectLeaderboardTop('100');

      cy.checkLeaderboardHeading('Top 100 Quickest Times');

      cy.checkTableHeading({ cell: 3, heading: 'Times' });

      cy.checkLeaderboardGameRange();
    });

    it('it should set filters to default params', () => {
      cy.visit('#/leaderboards/abc/5000');

      cy.checkSelectLeaderboardBest('Moves');
      cy.checkSelectLeaderboardTop('25');

      cy.checkLeaderboardHeading('Top 25 Lowest Moves');

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
      cy.mockUser();

      cy.visitApp();
    });

    it('it should display player name ', () => {
      cy.showLeaderboards();

      cy.checkLeaderboardNameExists(true);
    });
  });
});
