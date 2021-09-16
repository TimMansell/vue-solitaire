import { mockUid, mockNewUid } from '../../../src/mockData';
import quitGameDeck from '../../fixtures/decks/quitGame.json';
import quitGameMoves from '../../fixtures/moves/quitGame.json';

describe('History', () => {
  afterEach(() => {
    cy.clearTest();
  });

  describe('Default', () => {
    beforeEach(() => {
      cy.visitApp({ mockDeck: quitGameDeck });
    });

    it('should not show game paused if history overlay is visible', () => {
      cy.document().then((doc) => {
        cy.stub(doc, 'visibilityState').value('hidden');
      });

      cy.showHistory();

      cy.document().trigger('visibilitychange');

      cy.get('[data-test="game-paused"]').should('not.exist');
    });
  });

  describe('New user', () => {
    it('it shows no game message', () => {
      cy.visitApp({ mockDeck: quitGameDeck });

      cy.showHistory();

      cy.get('[data-test="game-history"]').should('not.exist');
      cy.get('[data-test="game-history-no-games-msg"]').should('exist');
    });

    it('it shows game history after first game played', () => {
      cy.task('clearUser', mockNewUid);

      localStorage.setItem('luid', mockNewUid);

      cy.task('populateDeck', [quitGameDeck, mockNewUid]);

      cy.visitApp({ mockDeck: quitGameDeck });

      cy.runGameWithClicks(quitGameMoves);

      cy.newGame();

      cy.get('[data-test="timer"]').then(($timer) => {
        const time = $timer.text();

        cy.get('[data-test="moves"]').then(($moves) => {
          const moves = $moves.text();

          cy.confirmNewGame();

          cy.showHistory();

          cy.get('[data-test="table-row"]').should('have.length', 1);
          cy.get('[data-test="table-row"] td')
            .eq(4)
            .text()
            .should('equal', moves);
          cy.get('[data-test="table-row"] td')
            .eq(5)
            .text()
            .should('equal', time);

          cy.checkCorrectHistoryPages(1, 25);

          cy.checkCorrectHistoryActivePage(1);

          cy.checkCorrectHistoryShowingGames();
        });
      });
    });
  });

  describe('Existing user', () => {
    beforeEach(() => {
      localStorage.setItem('luid', mockUid);

      cy.visitApp({ mockDeck: quitGameDeck });
    });

    it('it shows 1st page results', () => {
      cy.showHistory();

      cy.wait('@waitForHistoryAPI');

      cy.get('[data-test="table-row"]').should('have.length', 25);

      cy.get('[data-test="table-row"]:first-child td:first-child').then(
        (cell) => {
          const gameNumber = parseInt(cell.text(), 10);

          cy.get('[data-test="stats"]').should('contain', gameNumber);
        }
      );

      cy.checkCorrectHistoryPages(1, 25);

      cy.checkCorrectHistoryActivePage(1);

      cy.checkCorrectHistoryShowingGames();
    });

    it('it shows 2nd page results using > button', () => {
      cy.showHistory();

      cy.wait('@waitForHistoryAPI');

      cy.clickHistoryPageAndCheckGameNumber('>', -25);

      cy.checkCorrectHistoryPages(2, 25);

      cy.checkCorrectHistoryActivePage(2);

      cy.checkCorrectHistoryShowingGames();
    });

    it('it shows 2nd page results using page 2 number button', () => {
      cy.showHistory();

      cy.wait('@waitForHistoryAPI');

      cy.clickHistoryPageAndCheckGameNumber('2', -25);

      cy.checkCorrectHistoryPages(2, 25);

      cy.checkCorrectHistoryActivePage(2);

      cy.checkCorrectHistoryShowingGames();
    });

    it('it shows last page results using Last button', () => {
      cy.showHistory();

      cy.wait('@waitForHistoryAPI');

      cy.get('[data-test="pagination"]')
        .contains('Last')
        .click();

      cy.wait('@waitForHistoryAPI');

      cy.get('[data-test="table-row"]:last-child td:first-child').should(
        'contain',
        '1'
      );

      cy.get('[data-test="pagination"]')
        .children()
        .eq(-3)
        .should('have.class', 'pagination__page--is-active')
        .then(($page) => {
          const pageNumber = $page.text();

          cy.checkCorrectHistoryPages(pageNumber, 25);

          cy.checkCorrectHistoryActivePage(pageNumber);
        });

      cy.checkCorrectHistoryShowingGames();
    });

    it('it shows 1st page results using First button', () => {
      cy.showHistory();

      cy.wait('@waitForHistoryAPI');

      cy.get('[data-test="pagination"]')
        .contains('2')
        .click();

      cy.wait('@waitForHistoryAPI');

      cy.clickHistoryPageAndCheckGameNumber('First', +25);

      cy.checkCorrectHistoryPages(1, 25);

      cy.checkCorrectHistoryActivePage(1);

      cy.checkCorrectHistoryShowingGames();
    });

    it('it shows 1st page results using < button', () => {
      cy.showHistory();

      cy.wait('@waitForHistoryAPI');

      cy.get('[data-test="pagination"]')
        .contains('2')
        .click();

      cy.wait('@waitForHistoryAPI');

      cy.clickHistoryPageAndCheckGameNumber('<', +25);

      cy.checkCorrectHistoryPages(1, 25);

      cy.checkCorrectHistoryActivePage(1);

      cy.checkCorrectHistoryShowingGames();
    });

    it('it shows 50 games per page and correct page numbers', () => {
      cy.showHistory();

      cy.wait('@waitForHistoryAPI');

      cy.get('[data-test="table-row"]').should('have.length', 25);

      cy.get('[data-test="game-history"] [data-test="select"]').select('50');

      cy.wait('@waitForHistoryAPI');

      cy.get('[data-test="table-row"]').should('have.length', 50);

      cy.checkCorrectHistoryPages(1, 50);

      cy.checkCorrectHistoryActivePage(1);

      cy.checkCorrectHistoryShowingGames();
    });

    it('it shows page one when games per page is changed', () => {
      cy.showHistory();

      cy.wait('@waitForHistoryAPI');

      cy.get('[data-test="pagination"]')
        .contains('Last')
        .click();

      cy.wait('@waitForHistoryAPI');

      cy.get('[data-test="game-history"] [data-test="select"]').select('50');

      cy.wait('@waitForHistoryAPI');

      cy.checkCorrectHistoryPages(1, 50);

      cy.checkCorrectHistoryActivePage(1);

      cy.checkCorrectHistoryShowingGames();
    });

    it('it should scroll to correct position on page after clicking on page', () => {
      cy.showHistory();

      cy.wait('@waitForHistoryAPI');

      cy.get('[data-test="pagination"]')
        .contains('2')
        .click();

      cy.wait('@waitForHistoryAPI');

      cy.get('[data-test="filters"]').should('be.visible');

      cy.checkCorrectHistoryPages(2, 25);

      cy.checkCorrectHistoryActivePage(2);
    });
  });
});
