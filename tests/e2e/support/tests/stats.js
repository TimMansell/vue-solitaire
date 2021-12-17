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

Cypress.Commands.add('saveStats', () => {
  cy.getStats().then((stats) => cy.wrap(stats).as('stats'));
});

Cypress.Commands.add(
  'checkStatsHaveIncremented',
  ({ completed, won, lost, quit }) => {
    cy.showStats();

    cy.waitUntil(
      () =>
        Cypress.$('[data-test="game-overlay-msg"] [data-test="skeleton"]')
          .length === 0
    );

    cy.get('[data-test="user-stats"] [data-test="table-cell"]').as('userStats');
    cy.get('[data-test="global-stats"] [data-test="table-cell"]').as(
      'globalStats'
    );

    cy.get('@stats').then(({ userStats, globalStats }) => {
      const {
        won: uWon,
        lost: uLost,
        completed: uCompleted,
        abandoned: uQuit,
      } = userStats;
      const {
        won: gWon,
        lost: gLost,
        completed: gCompleted,
        abandoned: gQuit,
      } = globalStats;

      const uWonCount = won ? uWon + 1 : uWon;
      const uLostCount = lost ? uLost + 1 : uLost;
      const uCompletedCount = completed ? uCompleted + 1 : uCompleted;
      const uQuitCount = quit ? uQuit + 1 : uQuit;

      const gWonCount = won ? gWon + 1 : gWon;
      const gLostCount = lost ? gLost + 1 : gLost;
      const gCompletedCount = completed ? gCompleted + 1 : gCompleted;
      const gQuitCount = quit ? gQuit + 1 : gQuit;

      cy.checkGameNumber(uCompletedCount);

      cy.checkStatsValues('userStats', {
        won: uWonCount,
        lost: uLostCount,
        completed: uCompletedCount,
        quit: uQuitCount,
      });

      cy.checkStatsValues('globalStats', {
        won: gWonCount,
        lost: gLostCount,
        completed: gCompletedCount,
        quit: gQuitCount,
      });
    });
  }
);

Cypress.Commands.add(
  'checkStatsValues',
  (statsType, { completed, won, lost, quit }) => {
    cy.get(`@${statsType}`).eq(0).formatNumber().should('equal', completed);

    cy.get(`@${statsType}`).eq(1).formatNumber().should('equal', won);

    cy.get(`@${statsType}`).eq(2).formatNumber().should('equal', lost);

    cy.get(`@${statsType}`).eq(3).formatNumber().should('equal', quit);
  }
);

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
