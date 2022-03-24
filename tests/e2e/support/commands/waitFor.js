Cypress.Commands.add('waitForSkeleton', () =>
  cy.waitUntil(() => Cypress.$('[data-test="skeleton"]').length === 0)
);
