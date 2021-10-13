Cypress.Commands.add('checkVersionPopup', (shouldExist) => {
  const exist = shouldExist ? 'exist' : 'not.exist';

  cy.get('[data-test="version-alert"]').should(exist);
});
