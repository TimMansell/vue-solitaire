Cypress.Commands.add('checkConnectionPageIsVisible', (shouldExist) => {
  const exist = shouldExist ? 'exist' : 'not.exist';

  cy.get('[data-test="connection-error"]').should(exist);
});
