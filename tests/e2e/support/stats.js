import numeral from 'numeral';

Cypress.Commands.add('cacheStatValues', () => {
  cy.get('[data-test="stats-btn"]').click();

  cy.get('[data-test="user-stats"] [data-test="table-cell"]').as('cellUser');
  cy.get('[data-test="global-stats"] [data-test="table-cell"]').as(
    'cellGlobal'
  );

  cy.get('@cellUser')
    .eq(0)
    .text()
    .then(($count) => {
      cy.wrap($count).as('gamesPlayed');
    });

  cy.get('@cellUser')
    .eq(1)
    .text()
    .then(($count) => {
      cy.wrap($count).as('gamesWon');
    });

  cy.get('@cellUser')
    .eq(2)
    .text()
    .then(($count) => {
      cy.wrap($count).as('gamesLost');
    });

  cy.get('@cellUser')
    .eq(3)
    .text()
    .then(($count) => {
      cy.wrap($count).as('gamesQuit');
    });

  cy.get('@cellGlobal')
    .eq(0)
    .text()
    .then(($count) => {
      cy.wrap($count).as('globalGamesPlayed');
    });

  cy.get('@cellGlobal')
    .eq(1)
    .text()
    .then(($count) => {
      cy.wrap($count).as('globalGamesWon');
    });

  cy.get('@cellGlobal')
    .eq(2)
    .text()
    .then(($count) => {
      cy.wrap($count).as('globalGamesLost');
    });

  cy.get('@cellGlobal')
    .eq(3)
    .text()
    .then(($count) => {
      cy.wrap($count).as('globalGamesQuit');
    });

  cy.get('[data-test="game-overlay-close-btn"]').click();
});

Cypress.Commands.add('checkStatsValues', ({ stat, values }) => {
  const [one, two, three, four] = values;

  cy.get(`[data-test="${stat}-stats"] [data-test="table-cell"]`).as('stat');

  cy.get('@stat')
    .eq(0)
    .text()
    .should('equal', `${one}`);

  cy.get('@stat')
    .eq(1)
    .text()
    .should('equal', `${two}`);

  cy.get('@stat')
    .eq(2)
    .text()
    .should('equal', `${three}`);

  cy.get('@stat')
    .eq(3)
    .text()
    .should('equal', `${four}`);
});

Cypress.Commands.add('checkStatsValuesNot', ({ stat, values }) => {
  const [one, two, three, four] = values;

  cy.get(`[data-test="${stat}-stats"] [data-test="table-cell"]`).as('stat');

  cy.get('@stat')
    .eq(0)
    .text()
    .should('not.equal', `${one}`);

  cy.get('@stat')
    .eq(1)
    .text()
    .should('not.equal', `${two}`);

  cy.get('@stat')
    .eq(2)
    .text()
    .should('not.equal', `${three}`);

  cy.get('@stat')
    .eq(3)
    .text()
    .should('not.equal', `${four}`);
});

Cypress.Commands.add('checkGlobalStatsQuit', () => {
  cy.get('@globalGamesPlayed').then(($played) => {
    const $newPlayed = numeral(numeral($played).value() + 1).format('0,0');

    cy.get('@globalGamesWon').then(($won) => {
      cy.get('@globalGamesLost').then(($lost) => {
        cy.get('@globalGamesQuit').then(($quit) => {
          const $newQuit = numeral(numeral($quit).value() + 1).format('0,0');
          cy.checkStatsValues({
            stat: 'global',
            values: [$newPlayed, $won, $lost, $newQuit],
          });
        });
      });
    });
  });
});

Cypress.Commands.add('checkGlobalStatsWon', () => {
  cy.get('@globalGamesPlayed').then(($played) => {
    const $newPlayed = numeral(numeral($played).value() + 1).format('0,0');

    cy.get('@globalGamesWon').then(($won) => {
      const $newWon = numeral(numeral($won).value() + 1).format('0,0');

      cy.get('@globalGamesLost').then(($lost) => {
        cy.get('@globalGamesQuit').then(($quit) => {
          cy.checkStatsValues({
            stat: 'global',
            values: [$newPlayed, $newWon, $lost, $quit],
          });
        });
      });
    });
  });
});

Cypress.Commands.add('checkGlobalStatsLost', () => {
  cy.get('@globalGamesPlayed').then(($played) => {
    const $newPlayed = numeral(numeral($played).value() + 1).format('0,0');

    cy.get('@globalGamesWon').then(($won) => {
      cy.get('@globalGamesLost').then(($lost) => {
        const $newLost = numeral(numeral($lost).value() + 1).format('0,0');

        cy.get('@globalGamesQuit').then(($quit) => {
          cy.checkStatsValues({
            stat: 'global',
            values: [$newPlayed, $won, $newLost, $quit],
          });
        });
      });
    });
  });
});

Cypress.Commands.add('checkGameSummaryValues', ({ moves }) => {
  cy.get('[data-test="timer"]').then(($timerPaused) => {
    const timer = $timerPaused.text();

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
