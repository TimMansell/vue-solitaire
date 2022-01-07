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
  cy.showStats();

  cy.get('[data-test="user-stats"] [data-test="table-cell"]').as('userStats');
  cy.get('[data-test="global-stats"] [data-test="table-cell"]').as(
    'globalStats'
  );

  cy.get('@userStats').eq(0).saveNumberAs('userCompleted');
  cy.get('@userStats').eq(1).saveNumberAs('userWon');
  cy.get('@userStats').eq(2).saveNumberAs('userLost');
  cy.get('@userStats').eq(3).saveNumberAs('userQuit');
  cy.get('@globalStats').eq(0).saveNumberAs('globalCompleted');
  cy.get('@globalStats').eq(1).saveNumberAs('globalWon');
  cy.get('@globalStats').eq(2).saveNumberAs('globalLost');
  cy.get('@globalStats').eq(3).saveNumberAs('globalQuit');

  cy.closeOverlay();
});

Cypress.Commands.add(
  'checkStatsHaveIncremented',
  ({ completed, won, lost, quit }) => {
    cy.waitForGameNumberToUpdate();

    cy.showStats();

    cy.get('@userCompleted').then((value) => {
      const completedCount = completed ? value + 1 : value;

      cy.get('@userStats').eq(0).formatNumber().should('equal', completedCount);
    });

    cy.get('@userWon').then((value) => {
      const wonCount = won ? value + 1 : value;

      cy.get('@userStats').eq(1).formatNumber().should('equal', wonCount);
    });

    cy.get('@userLost').then((value) => {
      const lostCount = lost ? value + 1 : value;

      cy.get('@userStats').eq(2).formatNumber().should('equal', lostCount);
    });

    cy.get('@userQuit').then((value) => {
      const quitCount = quit ? value + 1 : value;

      cy.get('@userStats').eq(3).formatNumber().should('equal', quitCount);
    });

    cy.get('@globalCompleted').then((value) => {
      const completedCount = completed ? value + 1 : value;

      cy.get('@globalStats')
        .eq(0)
        .formatNumber()
        .should('equal', completedCount);
    });

    cy.get('@globalWon').then((value) => {
      const wonCount = won ? value + 1 : value;

      cy.get('@globalStats').eq(1).formatNumber().should('equal', wonCount);
    });

    cy.get('@globalLost').then((value) => {
      const lostCount = lost ? value + 1 : value;

      cy.get('@globalStats').eq(2).formatNumber().should('equal', lostCount);
    });

    cy.get('@globalQuit').then((value) => {
      const quitCount = quit ? value + 1 : value;

      cy.get('@globalStats').eq(3).formatNumber().should('equal', quitCount);
    });
  }
);

Cypress.Commands.add('checkUserStatsAreZero', () => {
  cy.showStats();

  cy.get('[data-test="user-stats"] [data-test="table-cell"]').as('userStats');

  cy.get('[data-test="stats"]').formatNumber().should('equal', 0);

  cy.get('[data-test="stats"]').formatNumber().should('equal', 0);

  cy.get('[data-test="stats"]').formatNumber().should('equal', 0);

  cy.get('[data-test="stats"]').formatNumber().should('equal', 0);
});

Cypress.Commands.add('checkUserStatsAreNotZero', () => {
  cy.showStats();

  cy.get('[data-test="user-stats"] [data-test="table-cell"]').as('userStats');

  cy.get('[data-test="stats"]').formatNumber().should('not.equal', 0);

  cy.get('[data-test="stats"]').formatNumber().should('not.equal', 0);

  cy.get('[data-test="stats"]').formatNumber().should('not.equal', 0);

  cy.get('[data-test="stats"]').formatNumber().should('not.equal', 0);
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
