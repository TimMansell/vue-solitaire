Cypress.Commands.add('checkPageIsVisible', (page) => {
  cy.get(`[data-test="${page}"]`).should('exist');
});

Cypress.Commands.add('checkPageIsHidden', (page) => {
  cy.get(`[data-test="${page}"]`).should('not.exist');
});

Cypress.Commands.add('checkPausedPage', (isVisible) => {
  const page = 'pause';

  if (isVisible) {
    cy.checkPageIsVisible(page);
  } else {
    cy.checkPageIsHidden(page);
  }
});

Cypress.Commands.add('check404Page', (isVisible) => {
  const page = '404';

  if (isVisible) {
    cy.checkPageIsVisible(page);
  } else {
    cy.checkPageIsHidden(page);
  }
});

Cypress.Commands.add('checkConnectionPage', (isVisible) => {
  const page = 'connection-error';

  if (isVisible) {
    cy.checkPageIsVisible(page);
  } else {
    cy.checkPageIsHidden(page);
  }
});

Cypress.Commands.add('checkUpdatePage', (isVisible) => {
  const page = 'update';

  if (isVisible) {
    cy.checkPageIsVisible(page);
  } else {
    cy.checkPageIsHidden(page);
  }
});

Cypress.Commands.add('checkNewPage', (isVisible) => {
  const page = 'new';

  if (isVisible) {
    cy.checkPageIsVisible(page);
  } else {
    cy.checkPageIsHidden(page);
  }
});

Cypress.Commands.add('checkRulesPage', (isVisible) => {
  const page = 'rules';

  if (isVisible) {
    cy.checkPageIsVisible(page);
  } else {
    cy.checkPageIsHidden(page);
  }
});

Cypress.Commands.add('checkHistoryPage', (isVisible) => {
  const page = 'history';

  if (isVisible) {
    cy.checkPageIsVisible(page);
  } else {
    cy.checkPageIsHidden(page);
  }
});

Cypress.Commands.add('checkStatsPage', (isVisible) => {
  const page = 'stats';

  if (isVisible) {
    cy.checkPageIsVisible(page);
  } else {
    cy.checkPageIsHidden(page);
  }
});

Cypress.Commands.add('checkLeaderboardsPage', (isVisible) => {
  const page = 'leaderboards';

  if (isVisible) {
    cy.checkPageIsVisible(page);
  } else {
    cy.checkPageIsHidden(page);
  }
});

Cypress.Commands.add('checkWonPage', (hasWon) => {
  const page = 'won';

  if (hasWon) {
    cy.checkPageIsVisible(page);
  } else {
    cy.checkPageIsHidden(page);
  }

  cy.checkPageIsHidden('lost');
});

Cypress.Commands.add('checkLostPage', (hasLost) => {
  const page = 'lost';

  if (hasLost) {
    cy.checkPageIsVisible(page);
  } else {
    cy.checkPageIsHidden(page);
  }

  cy.checkPageIsHidden('won');
});
