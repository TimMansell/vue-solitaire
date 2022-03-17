import { mockUid } from '../../../src/mockData';
import quitGameDeck from '../../fixtures/decks/quitGame.json';
import quitGameMoves from '../../fixtures/moves/quitGame.json';

describe.skip('History', () => {
  afterEach(() => {
    cy.clearTest();
  });

  describe('Default', () => {
    beforeEach(() => {
      cy.visitApp();
    });

    it('should not show game paused if history overlay is visible', () => {
      cy.setVisibilityHidden();

      cy.showHistory();

      cy.triggerVisibilityChange();

      cy.checkGameIsPaused(false);
    });
  });

  describe('New user', () => {
    beforeEach(() => {
      cy.visitApp();
    });

    it('it shows no game message', () => {
      cy.showHistory();

      cy.checkHistoryExists(false);
      cy.checkHistoryMessageExists(true);
    });

    it('it shows game history after first game played', () => {
      cy.setServerDeck(quitGameDeck);

      cy.runGameWithClicks(quitGameMoves);

      cy.startNewGame();

      cy.showHistory({ wait: true });

      cy.checkHistoryExists(true);
      cy.checkHistoryMessageExists(false);

      cy.checkTableHasRowLength(1);

      cy.checkHistoryPages();

      cy.checkIsOnPage(1);

      cy.checkHistoryShowingGames();
    });
  });

  describe('Existing user', () => {
    beforeEach(() => {
      cy.setUser(mockUid);

      cy.visitApp();
    });

    it('it shows 1st page results', () => {
      cy.showHistory({ wait: true });

      cy.checkHistoryExists(true);
      cy.checkHistoryMessageExists(false);

      cy.checkTableHasRowLength(25);

      cy.checkHistoryPages();

      cy.checkIsOnPage(1);

      cy.checkHistoryShowingGames();
    });

    it('it shows 2nd page results using > button', () => {
      cy.showHistory({ wait: true });

      cy.checkHistoryExists(true);
      cy.checkHistoryMessageExists(false);

      cy.setHistoryPage('>');

      cy.checkHistoryPages();

      cy.checkIsOnPage(2);

      cy.checkHistoryShowingGames();
    });

    it('it shows 2nd page results using page 2 number button', () => {
      cy.showHistory({ wait: true });

      cy.checkHistoryExists(true);
      cy.checkHistoryMessageExists(false);

      cy.setHistoryPage('2');

      cy.checkHistoryPages();

      cy.checkIsOnPage(2);

      cy.checkHistoryShowingGames();
    });

    it('it shows last page results using Last button', () => {
      cy.showHistory({ wait: true });

      cy.checkHistoryExists(true);
      cy.checkHistoryMessageExists(false);

      cy.setHistoryPage('Last');

      cy.checkHistoryHasFirstGameShowing();

      cy.checkHistoryPages();

      cy.checkIsLastPage();

      cy.checkHistoryShowingGames();
    });

    it('it shows 1st page results using First button', () => {
      cy.showHistory({ wait: true });

      cy.checkHistoryExists(true);
      cy.checkHistoryMessageExists(false);

      cy.setHistoryPage('2');

      cy.setHistoryPage('First');

      cy.checkHistoryPages();

      cy.checkIsOnPage(1);

      cy.checkHistoryShowingGames();
    });

    it('it shows 1st page results using < button', () => {
      cy.showHistory({ wait: true });

      cy.checkHistoryExists(true);
      cy.checkHistoryMessageExists(false);

      cy.setHistoryPage('2');
      cy.setHistoryPage('<');

      cy.checkHistoryPages();

      cy.checkIsOnPage(1);

      cy.checkHistoryShowingGames();
    });

    it('it shows 50 games per page and correct page numbers', () => {
      cy.showHistory({ wait: true });

      cy.checkHistoryExists(true);
      cy.checkHistoryMessageExists(false);

      cy.checkTableHasRowLength(25);

      cy.selectHistoryGames(50);

      cy.checkTableHasRowLength(50);

      cy.checkHistoryPages();

      cy.checkIsOnPage(1);

      cy.checkHistoryShowingGames();
    });

    it('it shows page one when games per page is changed', () => {
      cy.showHistory({ wait: true });

      cy.checkHistoryExists(true);
      cy.checkHistoryMessageExists(false);

      cy.setHistoryPage('Last');

      cy.selectHistoryGames(50);

      cy.checkHistoryPages();

      cy.checkIsOnPage(1);

      cy.checkHistoryShowingGames();
    });

    it('it should scroll to correct position on page after clicking on page', () => {
      cy.showHistory({ wait: true });

      cy.checkHistoryExists(true);
      cy.checkHistoryMessageExists(false);

      cy.setHistoryPage('2');

      cy.checkFilterAtTopOfPage();

      cy.checkHistoryPages();

      cy.checkIsOnPage(2);
    });

    it('should show correct data from url params', () => {
      const page = 2;
      const games = 50;

      cy.setUser(mockUid);

      cy.visit(`#/history/${page}/${games}`);

      cy.checkSelectHistoryGames(games);

      cy.checkHistoryPages();

      cy.checkIsOnPage(page);
    });

    it('it should set filters to default params', () => {
      cy.setUser(mockUid);

      cy.visit('#/history/abc/5000');

      cy.checkSelectHistoryGames(25);

      cy.checkHistoryPages();

      cy.checkIsOnPage(1);

      cy.url().should('include', '#/history/1/25');
    });
  });
});
