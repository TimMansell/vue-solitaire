Cypress.Commands.add('saveGames', () =>
  cy.get('[data-test="stats"]').saveNumberAs('games')
);

Cypress.Commands.add('checkGames', () => {
  cy.get('@games').then((stats) => {
    cy.get('[data-test="stats"]').formatNumber().should('equal', stats);
  });
});

Cypress.Commands.add('checkGameNumber', (number) => {
  cy.get('[data-test="stats"]').formatNumber().should('equal', number);
});

Cypress.Commands.add('checkGlobalGameNumber', (number) => {
  cy.get('[data-test="global-stats"]').formatNumber().should('equal', number);
});

Cypress.Commands.add('checkGameWon', (hasWon) => {
  const wonExist = hasWon ? 'exist' : 'not.exist';

  cy.get('[data-test="game-won"]').should(wonExist);
  cy.get('[data-test="game-lost"]').should('not.exist');
});

Cypress.Commands.add('checkGameLost', (hasLost) => {
  const lostExist = hasLost ? 'exist' : 'not.exist';

  cy.get('[data-test="game-lost"]').should(lostExist);
  cy.get('[data-test="game-won"]').should('not.exist');
});

Cypress.Commands.add('checkStats', () => {
  cy.showStats();

  cy.getStats().then(({ userStats, globalStats }) => {
    const {
      won: userWon,
      lost: userLost,
      completed: userCompleted,
    } = userStats;
    const {
      won: globalWon,
      lost: globalLost,
      completed: globalCompleted,
    } = globalStats;
    const userQuit = userCompleted - userWon - userLost;
    const globalQuit = globalCompleted - globalWon - globalLost;

    cy.get('[data-test="user-stats"] [data-test="table-cell"]').as('stat');

    cy.checkGameNumber(userCompleted);
    cy.checkStatsValues({
      won: userWon,
      lost: userLost,
      completed: userCompleted,
      quit: userQuit,
    });

    cy.get('[data-test="global-stats"] [data-test="table-cell"]').as('stat');

    cy.checkStatsValues({
      won: globalWon,
      lost: globalLost,
      completed: globalCompleted,
      quit: globalQuit,
    });
  });
});

Cypress.Commands.add('checkStatsValues', ({ completed, won, lost, quit }) => {
  cy.get('@stat').eq(0).formatNumber().should('equal', completed);

  cy.get('@stat').eq(1).formatNumber().should('equal', won);

  cy.get('@stat').eq(2).formatNumber().should('equal', lost);

  cy.get('@stat').eq(3).formatNumber().should('equal', quit);
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
