Cypress.Commands.add('visitApp', () => {
  cy.interceptAPIs();

  cy.visit('/');

  cy.wait('@GetInitialDataAPI');
});
