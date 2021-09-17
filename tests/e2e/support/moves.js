Cypress.Commands.add('checkMoves', (moves) => {
  cy.get('[data-test="moves"]')
    .text()
    .should('equal', `${moves}`);
});
