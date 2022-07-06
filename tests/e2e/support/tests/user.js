Cypress.Commands.add('checkPlayerCountIs', (count) =>
  cy.get('[data-test="player-count"]').formatNumber().should('equal', count)
);

Cypress.Commands.add('checkOnlinePlayerCount', () =>
  cy.get('[data-test="online-count"]').formatNumber().should('be.gt', 0)
);
