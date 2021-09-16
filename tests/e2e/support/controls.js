Cypress.Commands.add('testPause', () => {
  cy.pauseGame();

  cy.get('[data-test="game-paused"]').should('be.visible');

  cy.resumeGame();

  cy.get('[data-test="game-paused"]').should('not.exist');
});

Cypress.Commands.add('testRules', () => {
  cy.showRules();

  cy.get('[data-test="rules-overlay"]').should('be.visible');

  cy.closeOverlay();

  cy.get('[data-test="rules-overlay"]').should('not.exist');
});

Cypress.Commands.add('testHistory', () => {
  cy.showHistory();

  cy.get('[data-test="history-overlay"]').should('exist');

  cy.closeOverlay();

  cy.get('[data-test="history-overlay"]').should('not.exist');
});

Cypress.Commands.add('testStats', () => {
  cy.showStats();

  cy.get('[data-test="stats-overlay"]').should('exist');

  cy.wait('@waitForStatsAPI');

  cy.closeOverlay();

  cy.get('[data-test="stats-overlay"]').should('not.exist');
});

Cypress.Commands.add('testLeaderboards', () => {
  cy.showLeaderboards();

  cy.get('[data-test="leaderboards-overlay"]').should('exist');

  cy.wait('@waitForLeaderboardAPI');

  cy.closeOverlay();

  cy.get('[data-test="leaderboards-overlay"]').should('not.exist');
});
