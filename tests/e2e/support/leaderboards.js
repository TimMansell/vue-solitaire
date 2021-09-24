Cypress.Commands.add('selectLeaderboardTopItem', (value) => {
  cy.get('[data-test="leaderboard-set-top"] [data-test="select"]').select(
    value
  );

  cy.wait('@waitForLeaderboardAPI');
});

Cypress.Commands.add('selectLeaderboardBestItem', (value) => {
  cy.get('[data-test="leaderboard-set-best"] [data-test="select"]').select(
    value
  );

  cy.wait('@waitForLeaderboardAPI');
});

Cypress.Commands.add('checkLeaderboardHeading', (heading) => {
  cy.get('[data-test="leaderboards-heading"]').should('contain', heading);
});

Cypress.Commands.add('checkLeaderboardNameExists', (shouldExist) => {
  const exist = shouldExist ? 'exist' : 'not.exist';

  cy.get('[data-test="leaderboard-name"]').should(exist);
});
