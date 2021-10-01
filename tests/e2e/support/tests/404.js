Cypress.Commands.add('check404', () => {
  cy.get('[data-test="404"]').should('exist');
});
