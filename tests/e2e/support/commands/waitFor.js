Cypress.Commands.add('waitForGameCount', () =>
  cy
    .get('[data-test="user-games"]')
    .formatNumber()
    .then((currentCount) => {
      cy.waitUntil(() =>
        cy
          .get('[data-test="user-games"]')
          .formatNumber()
          .then((newCount) => newCount === currentCount + 1)
      );
    })
);

Cypress.Commands.add('waitForBoard', () =>
  cy.waitUntil(() =>
    cy
      .get('[data-test="columns"] [data-test^="card-"]')
      .then((cards) => cards.length === 52)
  )
);

Cypress.Commands.add('waitForPlayerCount', () =>
  cy
    .get('[data-test="player-count"]')
    .formatNumber()
    .then((currentCount) => {
      cy.waitUntil(() =>
        cy
          .get('[data-test="user-games"]')
          .formatNumber()
          .then((newCount) => currentCount !== newCount)
      );
    })
);

Cypress.Commands.add('waitForSkeleton', () =>
  cy.waitUntil(() => Cypress.$('[data-test="skeleton"]').length === 0)
);

Cypress.Commands.add('waitForToast', (id) =>
  cy.waitUntil(() => Cypress.$(`[data-test="toast-${id}"]`).length === 0)
);
