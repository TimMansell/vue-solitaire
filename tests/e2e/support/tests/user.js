Cypress.Commands.add('checkPlayerCount', () => {
  cy.waitForPlayerCount();

  cy.task('getPlayerCount').then((players) =>
    cy.get('[data-test="player-count"]').formatNumber().should('equal', players)
  );
});

Cypress.Commands.add('checkOnlinePlayerCount', () =>
  cy.get('[data-test="online-count"]').formatNumber().should('be.gt', 0)
);
