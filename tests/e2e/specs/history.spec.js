import { mockUid } from '../../../src/mockData';
import quitGameDeck from '../../fixtures/decks/quitGame.json';
import quitGameMoves from '../../fixtures/moves/quitGame.json';

describe('History', () => {
  afterEach(() => {
    cy.clearTest();
  });

  describe('Default', () => {
    beforeEach(() => {
      cy.mockApi({
        mockDeck: quitGameDeck,
        mockInitial: true,
      });

      cy.visitApp();
    });

    it('should not show game paused if history overlay is visible', () => {
      cy.setVisibilityHidden();

      cy.showHistory();

      cy.triggerVisibilityChange();

      cy.checkGamePaused(false);
    });
  });

  describe('New user', () => {
    beforeEach(() => {
      cy.mockApi({
        mockDeck: quitGameDeck,
      });

      cy.visitApp();

      cy.setDeck(quitGameDeck);
    });

    it('it shows no game message', () => {
      cy.showHistory();

      cy.checkHistoryExists(false);
      cy.checkGameMessageExists(true);
    });

    it('it shows game history after first game played', () => {
      cy.runGameWithClicks(quitGameMoves);

      cy.saveTimer({ alias: 'timer' });
      cy.saveMoves();

      cy.startNewGame({ waitUser: true, waitInitial: true });

      cy.showHistory({ wait: true });

      cy.checkHistoryExists(true);
      cy.checkGameMessageExists(false);

      cy.checkCorrectTableRows(1);

      cy.checkGameMoves();
      cy.checkGameTime();

      cy.checkCorrectPages();

      cy.checkCorrectPage(1);

      cy.checkCorrectShowingGames();
    });
  });

  describe('Existing user', () => {
    beforeEach(() => {
      cy.setUser(mockUid);

      cy.mockApi({
        mockDeck: quitGameDeck,
      });

      cy.visitApp();

      cy.setDeck(quitGameDeck);
    });

    it('it shows 1st page results', () => {
      cy.showHistory({ wait: true });

      cy.checkHistoryExists(true);
      cy.checkGameMessageExists(false);

      cy.checkCorrectTableRows(25);

      cy.checkGameNumbers();

      cy.checkCorrectPages();

      cy.checkCorrectPage(1);

      cy.checkCorrectShowingGames();
    });

    it('it shows 2nd page results using > button', () => {
      cy.showHistory({ wait: true });

      cy.checkHistoryExists(true);
      cy.checkGameMessageExists(false);

      cy.setHistoryPage('>');

      cy.checkGameNumbers();

      cy.checkCorrectPages();

      cy.checkCorrectPage(2);

      cy.checkCorrectShowingGames();
    });

    it('it shows 2nd page results using page 2 number button', () => {
      cy.showHistory({ wait: true });

      cy.checkHistoryExists(true);
      cy.checkGameMessageExists(false);

      cy.setHistoryPage('2');

      cy.checkGameNumbers();

      cy.checkCorrectPages();

      cy.checkCorrectPage(2);

      cy.checkCorrectShowingGames();
    });

    it('it shows last page results using Last button', () => {
      cy.showHistory({ wait: true });

      cy.checkHistoryExists(true);
      cy.checkGameMessageExists(false);

      cy.setHistoryPage('Last');

      cy.checkTableRow({ row: -1, cell: 0, value: '1' });

      cy.checkCorrectPages();

      cy.checkLastPage();

      cy.checkCorrectShowingGames();
    });

    it('it shows 1st page results using First button', () => {
      cy.showHistory({ wait: true });

      cy.checkHistoryExists(true);
      cy.checkGameMessageExists(false);

      cy.setHistoryPage('2');

      cy.setHistoryPage('First');

      cy.checkGameNumbers();

      cy.checkCorrectPages();

      cy.checkCorrectPage(1);

      cy.checkCorrectShowingGames();
    });

    it('it shows 1st page results using < button', () => {
      cy.showHistory({ wait: true });

      cy.checkHistoryExists(true);
      cy.checkGameMessageExists(false);

      cy.setHistoryPage('2');
      cy.setHistoryPage('<');

      cy.checkGameNumbers();

      cy.checkCorrectPages();

      cy.checkCorrectPage(1);

      cy.checkCorrectShowingGames();
    });

    it('it shows 50 games per page and correct page numbers', () => {
      cy.showHistory({ wait: true });

      cy.checkHistoryExists(true);
      cy.checkGameMessageExists(false);

      cy.checkCorrectTableRows(25);

      cy.selectGamesItem('50');

      cy.checkCorrectTableRows(50);

      cy.checkCorrectPages();

      cy.checkCorrectPage(1);

      cy.checkCorrectShowingGames();
    });

    it('it shows page one when games per page is changed', () => {
      cy.showHistory({ wait: true });

      cy.checkHistoryExists(true);
      cy.checkGameMessageExists(false);

      cy.setHistoryPage('Last');

      cy.selectGamesItem('50');

      cy.checkCorrectPages();

      cy.checkCorrectPage(1);

      cy.checkCorrectShowingGames();
    });

    it('it should scroll to correct position on page after clicking on page', () => {
      cy.showHistory({ wait: true });

      cy.checkHistoryExists(true);
      cy.checkGameMessageExists(false);

      cy.setHistoryPage('2');

      cy.checkFilterAtTopOfPage();

      cy.checkCorrectPages();

      cy.checkCorrectPage(2);
    });
  });
});
