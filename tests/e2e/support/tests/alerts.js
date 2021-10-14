Cypress.Commands.add('checkVersionAlertIsVisible', (shouldExist) => {
  const exist = shouldExist ? 'exist' : 'not.exist';

  cy.get('[data-test="version-alert"]').should(exist);
});

Cypress.Commands.add('checkConnectingAlertIsVisible', (shouldExist) => {
  const exist = shouldExist ? 'exist' : 'not.exist';

  cy.get('[data-test="connecting-alert"]').should(exist);
});

Cypress.Commands.add('checkOfflineAlertIsVisible', (shouldExist) => {
  const exist = shouldExist ? 'exist' : 'not.exist';

  cy.get('[data-test="offline-alert"]').should(exist);
});
