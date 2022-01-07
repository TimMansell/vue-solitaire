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
  cy.get('[data-test="leaderboard-set-top"] [data-test="select"] :selected');
});

Cypress.Commands.add('getSelectLeaderboardBest', () => {
  cy.get('[data-test="leaderboard-set-best"] [data-test="select"] :selected');
});

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
  cy.getSelectLeaderboardTop().then((selectedLimit) => {
    const limit = parseInt(selectedLimit[0].value, 10);

    cy.checkTableCell({ row: 0, cell: 0, value: 1 });
    cy.checkTableCell({ row: -1, cell: 0, value: limit });
  });
});
