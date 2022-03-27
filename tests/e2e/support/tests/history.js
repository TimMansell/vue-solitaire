Cypress.Commands.add('testHistoryPage', (pageText) => {
  cy.setPage(pageText);

  cy.waitForSkeleton();

  cy.checkFilterAtTopOfPage();

  cy.checkHistoryPages();

  cy.checkHistoryShowingGames();
});

Cypress.Commands.add('checkSelectHistoryGames', (value) => {
  cy.getSelectHistoryGames().should('equal', value);
});

Cypress.Commands.add('checkHistoryPages', () => {
  cy.getHistoryTotalGames().then((games) => {
    cy.getActivePage().then((page) => {
      cy.getSelectHistoryGames().then((historyGames) => {
        const pages = Math.ceil(games / historyGames);

        cy.get('[data-test="game-history-pages"]').should(
          'contain',
          `${page} / ${pages}`
        );
      });
    });
  });
});

Cypress.Commands.add('checkHistoryExists', (exists) => {
  const shouldExist = exists ? 'exist' : 'not.exist';

  cy.get('[data-test="game-history"]').should(shouldExist);
});

Cypress.Commands.add('checkHistoryMessageExists', (exists) => {
  const shouldExist = exists ? 'exist' : 'not.exist';

  cy.get('[data-test="game-history-no-games-msg"]').should(shouldExist);
});

Cypress.Commands.add('checkHistoryShowingGames', () => {
  cy.get('[data-test="table-row"]')
    .eq(0)
    .within(() => {
      cy.get('[data-test="table-cell"]').eq(0).text().as('firstGame');
    });

  cy.get('[data-test="table-row"]')
    .eq(-1)
    .within(() => {
      cy.get('[data-test="table-cell"]').eq(0).text().as('lastGame');
    });

  cy.get('@firstGame').then((firstGame) => {
    cy.get('@lastGame').then((lastGame) => {
      cy.get('[data-test="game-history-showing-games"]').should(
        'contain',
        `Showing games ${firstGame} to ${lastGame}`
      );
    });
  });
});

Cypress.Commands.add('checkHistoryHasFirstGameShowing', () => {
  cy.checkTableCell({ row: -1, cell: 0, value: '1' });
});
