Cypress.Commands.add('checkUpdatedAlertVisible', (isVisible) => {
  const exist = isVisible ? 'exist' : 'not.exist';

  cy.get('[data-test="toast-updated"]').should(exist);
});

Cypress.Commands.add('checkConnectedAlert', () => {
  cy.waitForToast('connection');

  cy.get('[data-test="toast-connection"]').should('not.exist');
});

Cypress.Commands.add('checkUpdatedAlert', () => {
  cy.checkUpdatedAlertVisible(true);

  cy.waitForToast('updated');

  cy.checkUpdatedAlertVisible(false);
});
