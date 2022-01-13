Cypress.Commands.add('checkAppUpdated', (shouldExist) => {
  const exist = shouldExist ? 'exist' : 'not.exist';

  cy.get('[data-test="updated-alert"]', { timeout: 0 }).should(exist);
});

Cypress.Commands.add('checkConnectingAlertIsVisible', (shouldExist) => {
  const exist = shouldExist ? 'exist' : 'not.exist';

  cy.get('[data-test="connecting-alert"]').should(exist);
});

Cypress.Commands.add('checkOfflineAlertIsVisible', (shouldExist) => {
  const exist = shouldExist ? 'exist' : 'not.exist';

  cy.get('[data-test="offline-alert"]').should(exist);
});

Cypress.Commands.add('waitForAppUpdatedToDisappear', () => {
  cy.waitUntil(() => Cypress.$('[data-test="updated-alert"]').length === 0);

  cy.get('[data-test="updated-alert"]').should('not.exist');
});
