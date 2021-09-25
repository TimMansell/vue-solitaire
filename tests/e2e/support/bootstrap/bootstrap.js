Cypress.Commands.add('visitApp', () => {
  cy.interceptInitialDataAPI();
  cy.interceptCreateUserAPI();
  cy.interceptHistoryAPI();
  cy.interceptLeaderboardAPI();
  cy.interceptStatsAPI();
  cy.interceptNewGameAPI();

  cy.visit('/');

  cy.wait('@waitForInitialDataAPI');
});
