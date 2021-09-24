Cypress.Commands.add('checkBoard', () => {
  cy.get('[data-test="board"]').should('be.visible');

  cy.get('[data-test="columns"]').within(() => {
    cy.get('[data-test^="card-"]').should('have.length', 52);
  });
});

Cypress.Commands.add('checkFoundations', () => {
  cy.get('[data-test="foundations"]').within(() => {
    cy.get('[data-test^="foundation-"]').should('have.length', 4);
  });
});

Cypress.Commands.add('checkPlaceholderCardExists', (exists) => {
  const shouldExist = exists ? 'exist' : 'not.exist';

  cy.get('[data-test="columns"]').within(() => {
    cy.get('[data-test="column-card-placeholder"]').should(shouldExist);
  });
});

Cypress.Commands.add('checkPlaceholderCardAtColumn', (column) => {
  cy.get(`[data-test="column-${column}"]`).within(() => {
    cy.get('[data-test="column-card-placeholder"]').should('be.visible');
  });
});
