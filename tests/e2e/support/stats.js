import numeral from 'numeral';

Cypress.Commands.add('saveGames', () =>
  cy.get('[data-test="stats"]').saveTextAs('games')
);

Cypress.Commands.add('checkGames', () => {
  cy.get('@games').then((stats) => {
    cy.get('[data-test="stats"]')
      .text()
      .should('equal', stats);
  });
});

Cypress.Commands.add('checkGameNumber', ({ number, shouldEqual = true }) => {
  const shouldHaveText = shouldEqual ? 'have.text' : 'not.have.text';

  cy.get('[data-test="stats"]').should(shouldHaveText, `${number}`);
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

Cypress.Commands.add('checkAllStats', ({ played, won, lost, quit }) => {
  cy.get('@games').then((stats) => {
    const number = numeral(stats).value();
    const incrementedNumber = numeral(number + 1).format('0,0');

    cy.checkGameNumber({ number: incrementedNumber });
  });

  const stats = ['user', 'global'];

  stats.forEach((stat) => {
    cy.get(`@${stat}Played`).then((gamesPlayed) => {
      cy.get(`@${stat}Won`).then((gamesWon) => {
        cy.get(`@${stat}Lost`).then((gamesLost) => {
          cy.get(`@${stat}Quit`).then((gamesQuit) => {
            const playedCount = played ? gamesPlayed + 1 : gamesPlayed;
            const wonCount = won ? gamesWon + 1 : gamesWon;
            const lostCount = lost ? gamesLost + 1 : gamesLost;
            const quitCount = quit ? gamesQuit + 1 : gamesQuit;

            cy.checkStats({
              stat,
              values: [playedCount, wonCount, lostCount, quitCount],
            });
          });
        });
      });
    });
  });
});

Cypress.Commands.add('checkStats', ({ stat, values, not = false }) => {
  const [played, won, lost, quit] = values;
  const shouldTest = not ? 'not.equal' : 'equal';

  cy.get(`[data-test="${stat}-stats"] [data-test="table-cell"]`).as('stat');

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
});

Cypress.Commands.add('checkGameSummaryValues', ({ moves }) => {
  cy.get('@timer').then((timer) => {
    cy.get('[data-test="game-summary-value"]')
      .eq(0)
      .text()
      .should('equal', timer);
  });

  cy.get('[data-test="game-summary-value"]')
    .eq(1)
    .text()
    .should('equal', `${moves}`);
});
