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
  const uid = localStorage.getItem('luid');

  cy.waitForTimerToStart();

  cy.showStats();

  cy.task('getUserStats', uid).then(({ completed, won, lost, quit }) => {
    cy.get('[data-test="user-stats"] [data-test="table-cell"]').as('userStats');

    cy.get('@userStats').eq(0).formatNumber().should('equal', completed);
    cy.get('@userStats').eq(1).formatNumber().should('equal', won);
    cy.get('@userStats').eq(2).formatNumber().should('equal', lost);
    cy.get('@userStats').eq(3).formatNumber().should('equal', quit);
  });

  cy.task('getGlobalStats').then(({ completed, won, lost, quit }) => {
    cy.get('[data-test="global-stats"] [data-test="table-cell"]').as(
      'globalStats'
    );

    cy.get('@globalStats').eq(0).formatNumber().should('equal', completed);
    cy.get('@globalStats').eq(1).formatNumber().should('equal', won);
    cy.get('@globalStats').eq(2).formatNumber().should('equal', lost);
    cy.get('@globalStats').eq(3).formatNumber().should('equal', quit);
  });

  cy.closeOverlay();
});

Cypress.Commands.add('checkUserStatsAreZero', () => {
  cy.showStats();

  cy.get('[data-test="user-stats"] [data-test="table-cell"]').as('userStats');

  cy.get('@userStats').eq(0).formatNumber().should('equal', 0);
  cy.get('@userStats').eq(1).formatNumber().should('equal', 0);
  cy.get('@userStats').eq(2).formatNumber().should('equal', 0);
  cy.get('@userStats').eq(3).formatNumber().should('equal', 0);

  cy.closeOverlay();
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
