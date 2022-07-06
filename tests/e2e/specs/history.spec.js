describe('History', () => {
  describe('New user', () => {
    beforeEach(() => {
      cy.visitApp();
    });

    afterEach(() => cy.cleanUp());

    it('it shows no game message', () => {
      cy.showHistory();

      cy.checkHistoryExists(false);
    });

    it('it shows game history after first game played', () => {
      cy.startNewGame();

      cy.showHistory();

      cy.checkHistoryExists(true);

      cy.checkTableHasRowLength(1);

      cy.checkHistoryPages();

      cy.checkIsOnPage(1);

      cy.checkHistoryShowingGames();
    });
  });

  describe('Existing user', () => {
    beforeEach(() => {
      cy.mockUser();

      cy.visitApp();
    });

    it('it shows correct results using pagingation', () => {
      cy.showHistory();

      cy.checkTableHasRowLength(25);

      cy.checkHistoryPages();
      cy.checkHistoryShowingGames();
      cy.checkIsOnPage(1);

      cy.testHistoryPage('2');
      cy.checkIsOnPage('2');

      cy.testHistoryPage('>');
      cy.checkIsOnPage('3');

      cy.testHistoryPage('<');
      cy.checkIsOnPage('2');

      cy.testHistoryPage('First');
      cy.checkIsOnPage('1');

      cy.testHistoryPage('Last');
      cy.checkHistoryHasFirstGameShowing();
      cy.checkIsOnLastPage();
    });

    it('it shows 50 games per page and correct page numbers', () => {
      cy.showHistory();

      cy.selectHistoryGames(50);

      cy.checkTableHasRowLength(50);

      cy.checkHistoryPages();

      cy.checkIsOnPage(1);

      cy.checkHistoryShowingGames();
    });

    it('it shows page one when games per page is changed', () => {
      cy.showHistory();

      cy.selectHistoryGames(50);

      cy.checkHistoryPages();

      cy.checkIsOnPage(1);

      cy.checkHistoryShowingGames();
    });

    it('should show correct data from url params', () => {
      const page = 2;
      const games = 50;

      cy.mockUser();

      cy.visit(`/history/${page}/${games}`);

      cy.checkSelectHistoryGames(games);

      cy.checkHistoryPages();

      cy.checkIsOnPage(page);
    });

    it('it should set filters to default params', () => {
      cy.mockUser();

      cy.visit('/history/abc/5000');

      cy.checkSelectHistoryGames(25);

      cy.checkHistoryPages();

      cy.checkIsOnPage(1);

      cy.url().should('include', '/1/25');
    });
  });
});
