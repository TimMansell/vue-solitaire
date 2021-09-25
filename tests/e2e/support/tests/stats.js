Cypress.Commands.add('saveGames', () =>
  cy.get('[data-test="stats"]').saveNumberAs('games')
);

Cypress.Commands.add('checkGames', () => {
  cy.get('@games').then((stats) => {
    cy.get('[data-test="stats"]')
      .formatNumber()
      .should('equal', stats);
  });
});

Cypress.Commands.add('checkGameNumber', (number) => {
  cy.get('[data-test="stats"]')
    .formatNumber()
    .should('equal', number);
});

Cypress.Commands.add('checkGameWon', () => {
  cy.get('[data-test="game-won"]').should('exist');
  cy.get('[data-test="game-lost"]').should('not.exist');
});

Cypress.Commands.add('checkGameLost', () => {
  cy.get('[data-test="game-lost"]').should('exist');
  cy.get('[data-test="game-won"]').should('not.exist');
});

Cypress.Commands.add('checkStats', () => {
  // const uid = localStorage.getItem('luid');

  cy.getStats();

  cy.showStats();

  cy.get('[data-test="user-stats"] [data-test="table-cell"]').as('stat');
  cy.get('@userStats').then(({ won, lost, completed }) => {
    const quit = completed - won - lost;

    cy.checkGameNumber(completed);

    cy.checkStatsValues({ won, lost, completed, quit });
  });

  cy.get('[data-test="global-stats"] [data-test="table-cell"]').as('stat');
  cy.get('@globalStats').then(({ won, lost, completed }) => {
    const quit = completed - won - lost;

    cy.checkStatsValues({ won, lost, completed, quit });
  });
});

Cypress.Commands.add('checkStatsValues', ({ completed, won, lost, quit }) => {
  cy.get('@stat')
    .eq(0)
    .formatNumber()
    .should('equal', completed);

  cy.get('@stat')
    .eq(1)
    .formatNumber()
    .should('equal', won);

  cy.get('@stat')
    .eq(2)
    .formatNumber()
    .should('equal', lost);

  cy.get('@stat')
    .eq(3)
    .formatNumber()
    .should('equal', quit);
});

Cypress.Commands.add('checkGameSummary', () => {
  const [timer] = JSON.parse(localStorage.getItem('timers'));

  cy.get(`@${timer}`).then((time) => {
    cy.get('[data-test="game-summary-value"]')
      .eq(0)
      .text()
      .should('equal', time);
  });

  cy.get('@moves').then((moves) => {
    cy.get('[data-test="game-summary-value"]')
      .eq(1)
      .text()
      .should('equal', `${moves}`);
  });
});
