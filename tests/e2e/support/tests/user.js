Cypress.Commands.add('checkPlayerCount', () =>
  cy
    .task('getPlayerCount')
    .then((players) =>
      cy
        .get('[data-test="player-count"]')
        .formatNumber()
        .should('equal', players)
    )
);

Cypress.Commands.add('checkOnlinePlayerCount', () =>
  cy.get('[data-test="online-count"]').formatNumber().should('be.gt', 0)
);

Cypress.Commands.add('setUser', (uid) => localStorage.setItem('luid', uid));
