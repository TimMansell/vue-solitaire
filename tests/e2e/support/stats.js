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

Cypress.Commands.add('checkGameNumber', (number) =>
  cy.get('[data-test="stats"]').should('have.text', number)
);

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

    cy.get('[data-test="stats"]')
      .text()
      .should('equal', incrementedNumber);
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
  const [one, two, three, four] = values;
  const shouldTest = not ? 'not.equal' : 'equal';

  cy.get(`[data-test="${stat}-stats"] [data-test="table-cell"]`).as('stat');

  cy.get('@stat')
    .eq(0)
    .formatNumber()
    .should(shouldTest, one);

  cy.get('@stat')
    .eq(1)
    .formatNumber()
    .should(shouldTest, two);

  cy.get('@stat')
    .eq(2)
    .formatNumber()
    .should(shouldTest, three);

  cy.get('@stat')
    .eq(3)
    .formatNumber()
    .should(shouldTest, four);
});

Cypress.Commands.add('checkGlobalStatsQuit', () => {
  cy.get('@globalGamesPlayed').then(($played) => {
    const $newPlayed = numeral(numeral($played).value() + 1).format('0,0');

    cy.get('@globalGamesWon').then(($won) => {
      cy.get('@globalGamesLost').then(($lost) => {
        cy.get('@globalGamesQuit').then(($quit) => {
          const $newQuit = numeral(numeral($quit).value() + 1).format('0,0');
          cy.checkStats({
            stat: 'global',
            values: [$newPlayed, $won, $lost, $newQuit],
          });
        });
      });
    });
  });
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
