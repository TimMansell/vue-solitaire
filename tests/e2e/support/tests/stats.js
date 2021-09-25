Cypress.Commands.add('saveGames', () =>
  cy.get('[data-test="stats"]').saveNumberAs('games')
);

Cypress.Commands.add(
  'checkGames',
  ({ shouldEqual } = { shouldEqual: true }) => {
    const shouldTest = shouldEqual ? 'equal' : 'not.equal';

    cy.get('@games').then((stats) => {
      cy.get('[data-test="stats"]')
        .formatNumber()
        .should(shouldTest, stats);
    });
  }
);

Cypress.Commands.add('checkGameNumber', ({ number, shouldEqual = true }) => {
  const shouldTest = shouldEqual ? 'equal' : 'not.equal';

  cy.get('[data-test="stats"]')
    .formatNumber()
    .should(shouldTest, number);
});

Cypress.Commands.add('checkGameWon', () => {
  cy.get('[data-test="game-won"]').should('exist');
  cy.get('[data-test="game-lost"]').should('not.exist');
});

Cypress.Commands.add('checkGameLost', () => {
  cy.get('[data-test="game-lost"]').should('exist');
  cy.get('[data-test="game-won"]').should('not.exist');
});

Cypress.Commands.add('saveStats', () => {
  cy.showStats();

  cy.get('[data-test="user-stats"] [data-test="table-cell"]').as('userStats');
  cy.get('[data-test="global-stats"] [data-test="table-cell"]').as(
    'globalStats'
  );

  cy.get('@userStats')
    .eq(0)
    .saveNumberAs('userPlayed');

  cy.get('@userStats')
    .eq(1)
    .saveNumberAs('userWon');

  cy.get('@userStats')
    .eq(2)
    .saveNumberAs('userLost');

  cy.get('@userStats')
    .eq(3)
    .saveNumberAs('userQuit');

  cy.get('@globalStats')
    .eq(0)
    .saveNumberAs('globalPlayed');

  cy.get('@globalStats')
    .eq(1)
    .saveNumberAs('globalWon');

  cy.get('@globalStats')
    .eq(2)
    .saveNumberAs('globalLost');

  cy.get('@globalStats')
    .eq(3)
    .saveNumberAs('globalQuit');

  cy.closeOverlay();
});

Cypress.Commands.add('checkIncrementedStats', ({ played, won, lost, quit }) => {
  cy.showStats();

  cy.get('@userPlayed').then((gamesPlayed) => {
    const playedCount = played ? gamesPlayed + 1 : gamesPlayed;

    cy.checkGameNumber({ number: playedCount });

    cy.get('@userWon').then((gamesWon) => {
      cy.get('@userLost').then((gamesLost) => {
        cy.get('@userQuit').then((gamesQuit) => {
          const wonCount = won ? gamesWon + 1 : gamesWon;
          const lostCount = lost ? gamesLost + 1 : gamesLost;
          const quitCount = quit ? gamesQuit + 1 : gamesQuit;

          cy.checkUserStats({
            played: playedCount,
            won: wonCount,
            lost: lostCount,
            quit: quitCount,
          });
        });
      });
    });
  });

  cy.get('@globalPlayed').then((gamesPlayed) => {
    cy.get('@globalWon').then((gamesWon) => {
      cy.get('@globalLost').then((gamesLost) => {
        cy.get('@globalQuit').then((gamesQuit) => {
          const playedCount = played ? gamesPlayed + 1 : gamesPlayed;
          const wonCount = won ? gamesWon + 1 : gamesWon;
          const lostCount = lost ? gamesLost + 1 : gamesLost;
          const quitCount = quit ? gamesQuit + 1 : gamesQuit;

          cy.checkGlobalStats({
            played: playedCount,
            won: wonCount,
            lost: lostCount,
            quit: quitCount,
          });
        });
      });
    });
  });
});

Cypress.Commands.add(
  'checkUserStats',
  ({ played, won, lost, quit, shouldEqual = true }) => {
    cy.get('[data-test="user-stats"] [data-test="table-cell"]').as('stat');

    cy.checkStats({ played, won, lost, quit, shouldEqual });
  }
);

Cypress.Commands.add(
  'checkGlobalStats',
  ({ played, won, lost, quit, shouldEqual = true }) => {
    cy.get('[data-test="global-stats"] [data-test="table-cell"]').as('stat');

    cy.checkStats({ played, won, lost, quit, shouldEqual });
  }
);

Cypress.Commands.add(
  'checkStats',
  ({ played, won, lost, quit, shouldEqual }) => {
    const shouldTest = shouldEqual ? 'equal' : 'not.equal';

    cy.get('@stat')
      .eq(0)
      .formatNumber()
      .should(shouldTest, played);

    cy.get('@stat')
      .eq(1)
      .formatNumber()
      .should(shouldTest, won);

    cy.get('@stat')
      .eq(2)
      .formatNumber()
      .should(shouldTest, lost);

    cy.get('@stat')
      .eq(3)
      .formatNumber()
      .should(shouldTest, quit);
  }
);

Cypress.Commands.add('checkGameSummaryValues', ({ moves }) => {
  const [timer] = JSON.parse(localStorage.getItem('timers'));

  cy.get(`@${timer}`).then((time) => {
    cy.get('[data-test="game-summary-value"]')
      .eq(0)
      .text()
      .should('equal', time);
  });

  cy.get('[data-test="game-summary-value"]')
    .eq(1)
    .text()
    .should('equal', `${moves}`);
});
