Cypress.Commands.add('selectTopItem', (value) => {
  cy.get('[data-test="leaderboard-set-top"] [data-test="select"]').select(
    value
  );

  cy.wait('@waitForLeaderboardAPI');
});

Cypress.Commands.add('selectBestItem', (value) => {
  cy.get('[data-test="leaderboard-set-best"] [data-test="select"]').select(
    value
  );

  cy.wait('@waitForLeaderboardAPI');
});
