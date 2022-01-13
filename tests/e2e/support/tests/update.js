Cypress.Commands.add('checkAppHasUpdated', (shouldExist) => {
  const exist = shouldExist ? 'exist' : 'not.exist';

  cy.get('[data-test="game-update"]').should(exist);
});

Cypress.Commands.add('checkUpdateTitle', (title) =>
  cy.get('[data-test="update-title"]').should('contain', title)
);
