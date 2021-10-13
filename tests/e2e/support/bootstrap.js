Cypress.Commands.add('visitApp', () => {
  cy.visit('/');

  cy.waitGlobalCount();
});
