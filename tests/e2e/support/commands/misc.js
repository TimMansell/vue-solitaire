Cypress.Commands.add('reloadAndWait', () => {
  cy.reload();

  cy.wait('@GetInitialDataAPI');
});

Cypress.Commands.add('clearTest', () => {
  cy.clearLocalStorage();
});
