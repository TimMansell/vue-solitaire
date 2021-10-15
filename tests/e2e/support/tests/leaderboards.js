Cypress.Commands.add('selectLeaderboardTop', (value) => {
  cy.get('[data-test="leaderboard-set-top"] [data-test="select"]').select(
    `${value}`
  );
});

Cypress.Commands.add('selectLeaderboardBest', (value) => {
  cy.get('[data-test="leaderboard-set-best"] [data-test="select"]').select(
    value
  );
});

Cypress.Commands.add('getSelectLeaderboardTop', () => {
  cy.get(
    '[data-test="leaderboard-set-top"] [data-test="select"] :selected'
  ).formatNumber();
});

Cypress.Commands.add('getSelectLeaderboardBest', () => {
  cy.get(
    '[data-test="leaderboard-set-best"] [data-test="select"] :selected'
  ).text();
});

Cypress.Commands.add('checkLeaderboards', () => {
  cy.getSelectLeaderboardBest().then((best) => {
    cy.getSelectLeaderboardTop().then((limit) => {
      cy.getLeaderboards({ best, limit }).then((games) => {
        const rows = [...Array(10).keys()].map(() =>
          Math.floor(Math.random() * (games.length - 1) + 1)
        );

        rows.forEach((row) => {
          cy.checkTableCell({ row, cell: 0, value: games[row].rank });
          cy.checkTableCell({ row, cell: 2, value: games[row].player });

          if (best === 'times') {
            cy.checkTableCell({ row, cell: 3, value: games[row].duration });
          } else {
            cy.checkTableCell({ row, cell: 3, value: games[row][best] });
          }
        });
      });
    });
  });
});

Cypress.Commands.add('checkSelectLeaderboardBest', (value) => {
  cy.getSelectLeaderboardBest().should('equal', value);
});

Cypress.Commands.add('checkSelectLeaderboardTop', (value) => {
  cy.getSelectLeaderboardTop().should('equal', value);
});

Cypress.Commands.add('checkLeaderboardHeading', (heading) => {
  cy.get('[data-test="leaderboards-heading"]').should('contain', heading);
});

Cypress.Commands.add('checkLeaderboardNameExists', (shouldExist) => {
  const exist = shouldExist ? 'exist' : 'not.exist';

  cy.get('[data-test="leaderboard-name"]').should(exist);
});

Cypress.Commands.add('checkLeaderboardGameRange', () => {
  cy.getSelectLeaderboardTop().then((value) => {
    cy.checkTableCell({ row: 0, cell: 0, value: 1 });
    cy.checkTableCell({ row: -1, cell: 0, value });
  });
});
