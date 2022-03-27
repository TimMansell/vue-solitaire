Cypress.Commands.add('checkUpdateTitle', (title) =>
  cy.get('[data-test="update-title"]').should('contain', title)
);
