Cypress.Commands.add('startNewGame', ({ waitUser } = { waitUser: false }) => {
  cy.newGame();
  cy.confirmNewGame({ waitUser });
});

Cypress.Commands.add('newGame', () => {
  cy.get('[data-test="new-game-btn"]').click();

  cy.checkVisibilityHidden(true);
});

Cypress.Commands.add('confirmNewGame', ({ waitUser } = { waitUser: false }) => {
  cy.get('[data-test="start-new-game-btn"]').click();

  cy.checkVisibilityHidden(false);

  if (waitUser) {
    cy.wait('@CreateAUserAPI');
  }

  cy.get('@mockedInitial').then((isMocked) => {
    if (!isMocked) {
      cy.wait('@GetInitialDataAPI');
    }
  });
});

Cypress.Commands.add('pauseGame', () => {
  cy.get('[data-test="pause-game-btn"]').click();

  cy.checkVisibilityHidden(true);
});

Cypress.Commands.add('resumeGame', () => {
  cy.get('[data-test="resume-game-btn"]').click();

  cy.checkVisibilityHidden(false);
});

Cypress.Commands.add('continueGame', () => {
  cy.get('[data-test="continue-game-btn"]').click();

  cy.checkVisibilityHidden(false);
});

Cypress.Commands.add('showStats', () => {
  cy.get('[data-test="stats-btn"]').click();

  cy.checkVisibilityHidden(true);

  cy.wait('@GetStatsAPI');
});

Cypress.Commands.add('showRules', () => {
  cy.get('[data-test="game-rules-btn"]').click();

  cy.checkVisibilityHidden(true);
});

Cypress.Commands.add('showHistory', ({ wait } = { wait: false }) => {
  cy.get('[data-test="history-btn"]').click();

  cy.checkVisibilityHidden(true);

  if (wait) {
    cy.wait('@UserHistoryAPI');
  }
});

Cypress.Commands.add('showLeaderboards', () => {
  cy.get('[data-test="leaderboards-btn"]').click();

  cy.checkVisibilityHidden(true);

  cy.wait('@LeaderboardsAPI');
});

Cypress.Commands.add('showBoard', () => {
  cy.get(
    '[data-test="game-overlay-btns"] [data-test="show-board-btn"]'
  ).click();

  cy.checkVisibilityHidden(true);
});

Cypress.Commands.add('closeOverlay', () => {
  cy.get('[data-test="game-overlay-close-btn"]').click();

  cy.checkVisibilityHidden(false);
});

Cypress.Commands.add('goHome', () => {
  cy.get('[data-test="home-btn"]').click();

  cy.checkVisibilityHidden(false);
});
