Cypress.Commands.add('checkPlayerCountHasIncremented', (shouldIncrement) => {
  if (shouldIncrement) {
    cy.waitForPlayerCountToIncrement();
  }

  cy.task('getPlayerCount').then((players) => cy.checkPlayerNumber(players));
});

Cypress.Commands.add('checkPlayerNumber', (players) =>
  cy.get('[data-test="player-count"]').formatNumber().should('equal', players)
);

Cypress.Commands.add('checkOnlinePlayerNumber', () =>
  cy.get('[data-test="online-count"]').formatNumber().should('be.gt', 0)
);

Cypress.Commands.add('setUser', (uid) => localStorage.setItem('luid', uid));
