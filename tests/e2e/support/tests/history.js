Cypress.Commands.add('setHistoryPage', (pageText) => {
  cy.setPage(pageText);
});

Cypress.Commands.add('selectHistoryGames', (value) => {
  cy.get('[data-test="game-history"] [data-test="select"]').select(`${value}`);
});

Cypress.Commands.add('getSelectHistoryGames', () => {
  cy.get(
    '[data-test="game-history"] [data-test="select"] :selected'
  ).formatNumber();
});

Cypress.Commands.add('getHistoryTotalGames', () => {
  cy.get('[data-test="game-history-total-games"]').getData('games');
});

Cypress.Commands.add('getFirstAndLastGame', () => {
  cy.getActivePage().as('activePage');
  cy.getSelectHistoryGames().as('historyGames');

  cy.get('@activePage').then((page) => {
    cy.get('@historyGames').then((limit) => {
      const offset = (page - 1) * limit;

      cy.getUserHistory({ offset, limit }).then((history) => {
        const [firstGame] = history;
        const [lastGame] = history.slice(-1);

        return { firstGame, lastGame };
      });
    });
  });
});

Cypress.Commands.add('checkSelectHistoryGames', (value) => {
  cy.getSelectHistoryGames().should('equal', value);
});

Cypress.Commands.add('checkHistoryGameRange', () => {
  cy.getFirstAndLastGame().then(({ firstGame, lastGame }) => {
    cy.checkTableCell({ row: 0, cell: 0, value: firstGame.number });
    cy.checkTableCell({ row: -1, cell: 0, value: lastGame.number });
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
  cy.getUserHistory({ offset: 0, limit: 1 }).then((history) => {
    const { number, date, time, outcome, moves, duration } = history[0];

    cy.checkTableCell({ row: 0, cell: 0, value: number });
    cy.checkTableCell({ row: 0, cell: 1, value: date });
    cy.checkTableCell({ row: 0, cell: 2, value: time });
    cy.checkTableCell({ row: 0, cell: 3, value: outcome });
    cy.checkTableCell({ row: 0, cell: 4, value: moves });
    cy.checkTableCell({ row: 0, cell: 5, value: duration });
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
  cy.getFirstAndLastGame().then(({ firstGame, lastGame }) => {
    cy.get('[data-test="game-history-showing-games"]').should(
      'contain',
      `Showing games ${firstGame.number} to ${lastGame.number}`
    );
  });
});

Cypress.Commands.add('checkHistoryHasFirstGameShowing', () => {
  cy.checkTableCell({ row: -1, cell: 0, value: '1' });
});

Cypress.Commands.add('waitforInitialHistoryPageToLoad', (shouldWait) => {
  if (shouldWait) {
    cy.getHistoryTotalGames().then((games) => {
      cy.waitUntil(() => cy.checkTableCell({ row: 0, cell: 0, value: games }));
    });
  }
});
