Cypress.Commands.add('reloadAndWait', () => {
  cy.reload();

  cy.wait('@waitForInitialDataAPI');
});

Cypress.Commands.add('clearTest', () => {
  cy.clearLocalStorage();
});
