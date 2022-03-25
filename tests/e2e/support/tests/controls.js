Cypress.Commands.add('testContinueGame', () => {
  cy.newGame();

  cy.get('[data-test="game-new"]').should('exist');

  cy.reload();

  cy.get('[data-test="game-new"]').should('exist');

  cy.continueGame();

  cy.get('[data-test="game-new"]').should('not.exist');
});

Cypress.Commands.add('testPause', () => {
  cy.pauseGame();

  cy.checkGameIsPaused(true);

  cy.reload();

  cy.checkGameIsPaused(true);

  cy.resumeGame();

  cy.checkGameIsPaused(false);
});

Cypress.Commands.add('testRules', () => {
  cy.showRules();

  cy.get('[data-test="rules-overlay"]').should('exist');

  cy.reload();

  cy.get('[data-test="rules-overlay"]').should('exist');

  cy.closeOverlay();

  cy.get('[data-test="rules-overlay"]').should('not.exist');
});

Cypress.Commands.add('testHistory', () => {
  cy.showHistory();

  cy.get('[data-test="history-overlay"]').should('exist');

  cy.reload();

  cy.get('[data-test="history-overlay"]').should('exist');

  cy.closeOverlay();

  cy.get('[data-test="history-overlay"]').should('not.exist');
});

Cypress.Commands.add('testStats', () => {
  cy.showStats();

  cy.get('[data-test="stats-overlay"]').should('exist');

  cy.reload();

  cy.get('[data-test="stats-overlay"]').should('exist');

  cy.closeOverlay();

  cy.get('[data-test="stats-overlay"]').should('not.exist');
});

Cypress.Commands.add('testLeaderboards', () => {
  cy.showLeaderboards();

  cy.get('[data-test="leaderboards-overlay"]').should('exist');

  cy.reload();

  cy.get('[data-test="leaderboards-overlay"]').should('exist');

  cy.closeOverlay();

  cy.get('[data-test="leaderboards-overlay"]').should('not.exist');
});

Cypress.Commands.add('testShowBoard', () => {
  cy.showBoard();

  cy.get('[data-test="game-lost"]').should(
    'have.class',
    'game-overlay--see-through'
  );

  cy.get('[data-test="game-overlay-logo"]').should('not.be.visible');
  cy.get('[data-test="game-overlay-header"]').should('not.be.visible');
  cy.get('[data-test="game-overlay-msg"]').should('not.be.visible');

  cy.showBoard();

  cy.get('[data-test="game-lost"]').should(
    'not.have.class',
    'game-overlay--see-through'
  );

  cy.get('[data-test="game-overlay-logo"]').should('be.visible');
  cy.get('[data-test="game-overlay-header"]').should('be.visible');
  cy.get('[data-test="game-overlay-msg"]').should('be.visible');
});
