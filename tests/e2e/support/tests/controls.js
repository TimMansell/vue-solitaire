Cypress.Commands.add('testContinueGame', () => {
  cy.newGame();

  cy.checkNewPage(true);

  cy.reload();

  cy.checkNewPage(true);

  cy.continueGame();

  cy.checkNewPage(false);
});

Cypress.Commands.add('testPause', () => {
  cy.pauseGame();

  cy.checkPausedPage(true);

  cy.reload();

  cy.checkPausedPage(true);

  cy.resumeGame();

  cy.checkPausedPage(false);
});

Cypress.Commands.add('testRules', () => {
  cy.showRules();

  cy.checkRulesPage(true);

  cy.reload();

  cy.checkRulesPage(true);

  cy.closeOverlay();

  cy.checkRulesPage(false);
});

Cypress.Commands.add('testHistory', () => {
  cy.showHistory();

  cy.checkHistoryPage(true);

  cy.reload();

  cy.checkHistoryPage(true);

  cy.closeOverlay();

  cy.checkHistoryPage(false);
});

Cypress.Commands.add('testStats', () => {
  cy.showStats();

  cy.checkStatsPage(true);

  cy.reload();

  cy.checkStatsPage(true);

  cy.closeOverlay();

  cy.checkStatsPage(false);
});

Cypress.Commands.add('testLeaderboards', () => {
  cy.showLeaderboards();

  cy.checkLeaderboardsPage(true);

  cy.reload();

  cy.checkLeaderboardsPage(true);

  cy.closeOverlay();

  cy.checkLeaderboardsPage(false);
});

Cypress.Commands.add('testShowBoard', () => {
  cy.showBoard();

  cy.get('[data-test="lost"]').should(
    'have.class',
    'game-overlay--see-through'
  );

  cy.get('[data-test="game-overlay-logo"]').should('not.be.visible');
  cy.get('[data-test="game-overlay-header"]').should('not.be.visible');
  cy.get('[data-test="game-overlay-msg"]').should('not.be.visible');

  cy.showBoard();

  cy.get('[data-test="lost"]').should(
    'not.have.class',
    'game-overlay--see-through'
  );

  cy.get('[data-test="game-overlay-logo"]').should('be.visible');
  cy.get('[data-test="game-overlay-header"]').should('be.visible');
  cy.get('[data-test="game-overlay-msg"]').should('be.visible');
});
