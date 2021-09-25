Cypress.Commands.add('setHistoryPage', (pageText) => {
  cy.setPage(pageText);

  cy.wait('@waitForHistoryAPI');
});

Cypress.Commands.add('selectHistoryGames', (value) => {
  cy.get('[data-test="game-history"] [data-test="select"]').select(value);

  cy.wait('@waitForHistoryAPI');
});

Cypress.Commands.add('getSelectHistoryGames', () => {
  cy.get(
    '[data-test="game-history"] [data-test="select"] :selected'
  ).formatNumber();
});

Cypress.Commands.add('getHistoryTotalGames', () => {
  cy.get('[data-test="game-history-total-games"]').getData('games');
});

Cypress.Commands.add('checkHistoryGameRange', () => {
  cy.getTableCellValue({ row: 0, cell: 0 }).saveNumberAs('firstRow');
  cy.getTableCellValue({ row: -1, cell: 0 }).saveNumberAs('lastRow');
  cy.getHistoryTotalGames().as('games');
  cy.getActivePage().as('activePage');
  cy.getSelectHistoryGames().as('historyGames');

  cy.get('@games').then((games) => {
    cy.get('@activePage').then((page) => {
      cy.get('@historyGames').then((historyGames) => {
        cy.get('@firstRow').then((firstRow) => {
          expect(firstRow).to.equal(games - (page - 1) * historyGames);
        });

        cy.get('@lastRow').then((lastRow) => {
          expect(lastRow).to.equal(games - page * historyGames + 1);
        });
      });
    });
  });
});

Cypress.Commands.add('checkHistoryPages', () => {
  cy.getHistoryTotalGames().as('games');
  cy.getActivePage().as('activePage');
  cy.getSelectHistoryGames().as('historyGames');

  cy.get('@games').then((games) => {
    cy.get('@activePage').then((page) => {
      cy.get('@historyGames').then((historyGames) => {
        const pages = Math.ceil(games / historyGames);

        cy.get('[data-test="game-history-pages"]').should(
          'contain',
          `${page} / ${pages}`
        );
      });
    });
  });
});

Cypress.Commands.add('checkHistoryGame', () => {
  const [timer] = JSON.parse(localStorage.getItem('timers'));

  cy.get(`@${timer}`).then((time) => {
    cy.checkTableCellValue({ row: 0, cell: 5, value: time });
  });

  cy.get('@moves').then((moves) => {
    cy.checkTableCellValue({ row: 0, cell: 4, value: moves });
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
  cy.getTableCellValue({ row: 0, cell: 0 }).saveNumberAs('firstRow');
  cy.getTableCellValue({ row: -1, cell: 0 }).saveNumberAs('lastRow');

  cy.get('@firstRow').then((firstRow) => {
    cy.get('@lastRow').then((lastRow) => {
      cy.get('[data-test="game-history-showing-games"]').should(
        'contain',
        `Showing games ${firstRow} to ${lastRow}`
      );
    });
  });
});

Cypress.Commands.add('checkHistoryHasFirstGameShowing', () => {
  cy.checkTableCellValue({ row: -1, cell: 0, value: '1' });
});
