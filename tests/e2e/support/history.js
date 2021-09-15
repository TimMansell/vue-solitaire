Cypress.Commands.add(
  'clickHistoryPageAndCheckGameNumber',
  (pageText, displayGames) => {
    cy.get('[data-test="table-row"]:first-child td:first-child').then(
      (cell) => {
        const gameNumber = parseInt(cell.text(), 10);

        cy.get('[data-test="pagination"]')
          .contains(pageText)
          .click();

        cy.wait('@waitForHistoryAPI');

        cy.get('[data-test="table-row"]:first-child td:first-child').should(
          'contain',
          gameNumber + displayGames
        );
      }
    );
  }
);

Cypress.Commands.add('checkCorrectHistoryActivePage', (activePage) => {
  cy.get('[data-test="pagination"]')
    .find('.pagination__page--is-active')
    .should('contain', activePage);
});

Cypress.Commands.add('checkCorrectHistoryPages', (page, displayGames) => {
  cy.get('[data-test="game-history-total-games"]').then(($games) => {
    const games = $games.attr('data-games');
    const pages = Math.ceil(games / displayGames);

    cy.get('[data-test="game-history-pages"]').should(
      'contain',
      `${page} / ${pages}`
    );
  });
});

Cypress.Commands.add('checkCorrectHistoryShowingGames', () => {
  cy.get('[data-test="table-row"]:first-child td:first-child').then(
    (cellFirst) => {
      const firstGameNumber = parseInt(cellFirst.text(), 10);

      cy.get('[data-test="table-row"]:last-child td:first-child').then(
        (cellLast) => {
          const lastGameNumber = parseInt(cellLast.text(), 10);

          cy.get('[data-test="game-history-showing-games"]').should(
            'contain',
            `Showing games ${firstGameNumber} to ${lastGameNumber}`
          );
        }
      );
    }
  );
});
