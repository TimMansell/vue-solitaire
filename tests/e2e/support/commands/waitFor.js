Cypress.Commands.add('waitForBoard', () =>
  cy.waitUntil(
    () => Cypress.$('[data-test="columns"] [data-test^="card-"]').length === 52
  )
);

Cypress.Commands.add('waitForSkeleton', () => {
  cy.get('body').then((body) => {
    if (body.find('[data-test="skeleton"]').length) {
      cy.waitUntil(() => !Cypress.$('[data-test="skeleton"]').length);
    }
  });
});

Cypress.Commands.add('waitForToast', (id) =>
  cy.waitUntil(() => !Cypress.$(`[data-test="toast-${id}"]`).length)
);

Cypress.Commands.add('waitSeconds', (waitFor) => cy.wait(waitFor * 1000));
