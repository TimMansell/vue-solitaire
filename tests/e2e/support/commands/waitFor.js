Cypress.Commands.add('waitForTimerToStart', () =>
  cy.waitUntil(() =>
    cy
      .get('[data-test="timer"]')
      .text()
      .then((timer) => timer === '0:00:01')
  )
);

Cypress.Commands.add('waitForSkeleton', () =>
  cy.waitUntil(() => Cypress.$('[data-test="skeleton"]').length === 0)
);

Cypress.Commands.add('waitForGameNumberToUpdate', () =>
  cy
    .get('[data-test="global-stats"]')
    .formatNumber()
    .then((number) => {
      cy.waitUntil(() =>
        cy
          .get('[data-test="global-stats"]')
          .formatNumber()
          .then((number2) => number2 !== number)
      );
    })
);

Cypress.Commands.add('waitForToast', (id) => {
  cy.waitUntil(() => Cypress.$(`[data-test="toast-${id}"]`).length === 0);

  cy.get(`[data-test="toast-${id}"]`).should('not.exist');
});

Cypress.Commands.add('waitForPlayerCountToIncrement', () =>
  cy
    .get('[data-test="player-count"]')
    .formatNumber()
    .then((number) => {
      cy.waitUntil(() =>
        cy
          .get('[data-test="player-count"]')
          .formatNumber()
          .then((number2) => number2 !== number)
      );
    })
);
