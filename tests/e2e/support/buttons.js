Cypress.Commands.add('startNewGame', () => {
  cy.newGame();
  cy.confirmNewGame();
});

Cypress.Commands.add('newGame', () => {
  cy.get('[data-test="new-game-btn"]').click();
});

Cypress.Commands.add('confirmNewGame', () => {
  cy.get('[data-test="game-overlay-btns"] [data-test="new-game-btn"]').click();
});

Cypress.Commands.add('pauseGame', () => {
  cy.get('[data-test="pause-game-btn"]').click();
});

Cypress.Commands.add('resumeGame', () => {
  cy.get(
    '[data-test="game-overlay-btns"] [data-test="pause-game-btn"]'
  ).click();
});

Cypress.Commands.add('continueGame', () => {
  cy.get(
    '[data-test="game-overlay-btns"] [data-test="continue-game-btn"]'
  ).click();
});

Cypress.Commands.add('showStats', () => {
  cy.get('[data-test="stats-btn"]').click();

  cy.wait('@waitForStatsAPI');
});

Cypress.Commands.add('showRules', () => {
  cy.get('[data-test="game-rules-btn"]').click();
});

Cypress.Commands.add('showHistory', ({ wait } = { wait: true }) => {
  cy.get('[data-test="history-btn"]').click();

  if (wait) {
    cy.wait('@waitForHistoryAPI');
  }
});

Cypress.Commands.add('showLeaderboards', () => {
  cy.get('[data-test="leaderboards-btn"]').click();

  cy.wait('@waitForLeaderboardAPI');
});

Cypress.Commands.add('showBoard', () => {
  cy.get(
    '[data-test="game-overlay-btns"] [data-test="show-board-btn"]'
  ).click();
});

Cypress.Commands.add('closeOverlay', () => {
  cy.get('[data-test="game-overlay-close-btn"]').click();
});
