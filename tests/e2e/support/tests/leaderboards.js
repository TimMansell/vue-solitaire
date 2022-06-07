Cypress.Commands.add('checkSelectLeaderboardBest', (value) => {
  cy.getSelectLeaderboardBest().text().should('equal', value);
});

Cypress.Commands.add('checkSelectLeaderboardTop', (value) => {
  cy.getSelectLeaderboardTop().text().should('equal', value);
});

Cypress.Commands.add('checkLeaderboardHeading', (heading) => {
  cy.get('[data-test="leaderboards-heading"]').should('contain', heading);
});

Cypress.Commands.add('checkLeaderboardNameExists', (shouldExist) => {
  const exist = shouldExist ? 'exist' : 'not.exist';

  cy.get('[data-test="leaderboard-name"]').should(exist);
});

Cypress.Commands.add('checkLeaderboardGameRange', () => {
  cy.getSelectLeaderboardTop()
    .text()
    .then((value) => {
      const limit = parseInt(value, 10);

      cy.checkTableCell({ row: 0, cell: 0, value: 1 });

      cy.checkTableHasRowLength(limit);
    });
});
