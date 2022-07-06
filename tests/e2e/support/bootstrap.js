Cypress.Commands.add('visitApp', () => {
  cy.visit('/');

  cy.waitForBoard();
});

Cypress.Commands.add('cleanUp', () => cy.mockPaused(true));
