Cypress.Commands.add('visitApp', () => {
  cy.interceptAPIs();

  cy.visit('/');
});
