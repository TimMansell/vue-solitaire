Cypress.Commands.add('setLocalStorage', (item, value) => {
  cy.get('[data-test="board"]').then(() => {
    localStorage.setItem(item, value);
  });
});

Cypress.Commands.add('removeLocalStorage', (item) => {
  cy.get('[data-test="board"]').then(() => {
    localStorage.removeItem(item);
  });
});
