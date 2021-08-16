import numeral from 'numeral';
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
import 'cypress-commands';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('setBoard', (board) => {
  cy.window().should('have.property', 'appReady', true);

  const getStore = () => cy.window().its('app.$store');

  return getStore().then((store) =>
    store.dispatch('setBoardAndFoundation', board)
  );
});

Cypress.Commands.add('dragFromTo', (dragFrom, dragTo) => {
  cy.get(`[data-test="${dragFrom}"]`)
    .trigger('dragstart', {
      dataTransfer: new DataTransfer(),
      eventConstructor: 'DragEvent',
      force: true,
    })
    .trigger('mousemove', 0, 0, {
      force: true,
    });

  cy.get(`[data-test="dragged-cards"] [data-test="${dragFrom}"]`).should(
    'be.visible'
  );

  cy.get(`[data-test="columns"] [data-test="${dragFrom}"]`).should(
    'not.be.visible'
  );

  cy.get(`[data-test="${dragTo}"]`)
    .trigger('drop', { force: true })
    .trigger('dragend', { force: true });

  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(500);

  cy.get('[data-test="dragged-cards"]')
    .children()
    .should('have.length', 0);
});

Cypress.Commands.add('drag', { prevSubject: true }, (subject, x, y) => {
  cy.get('[data-test="columns"]').within(() => {
    cy.get(subject)
      .trigger('dragstart', 0, 0, {
        dataTransfer: new DataTransfer(),
        force: true,
      })
      .trigger('mousemove', x, y, {
        force: true,
      });
  });
});

Cypress.Commands.add('clickTo', { prevSubject: true }, (subject, clickTo) => {
  cy.get(subject).click({ force: true });
  cy.get(clickTo).click({ force: true });
});

Cypress.Commands.add(
  'shouldContain',
  { prevSubject: true },
  (subject, elements) => {
    cy.get(subject).within(() => {
      elements.forEach((element) => {
        cy.get(`[data-test="card-${element}"]`).should('be.visible');
      });
    });
  }
);

Cypress.Commands.add(
  'shouldNotContain',
  { prevSubject: true },
  (subject, elements) => {
    cy.get(subject).within(() => {
      elements.forEach((element) => {
        cy.get(`[data-test="card-${element}"]`).should('not.exist');
      });
    });
  }
);

Cypress.Commands.add('newGame', ({ wait }) => {
  cy.get('[data-test="new-game-btn"]').click();

  cy.get('[data-test="game-overlay-btns"]').within(() => {
    cy.get('[data-test="new-game-btn"]').click();
  });

  if (wait) {
    cy.wait('@apiCheck');
  }
});

Cypress.Commands.add('interceptVersionCheck', (alias, version) => {
  cy.intercept('POST', '.netlify/functions/graphql', (req) => {
    const { body } = req;

    if (body?.query.includes('version')) {
      // eslint-disable-next-line no-param-reassign
      req.alias = alias;

      // eslint-disable-next-line no-param-reassign
      console.log({ version });

      if (version) {
        req.reply({
          data: { version: { number: version, __typename: 'Version' } },
        });
      }
    }
  });
});

Cypress.Commands.add(
  'clickHistoryPageAndCheckGameNumber',
  (pageText, displayGames) => {
    cy.get('[data-test="table-row"]:first-child td:first-child').then(
      (cell) => {
        const gameNumber = parseInt(cell.text(), 10);

        cy.get('[data-test="pagination"]')
          .contains(pageText)
          .click();

        cy.wait('@apiCheck');

        cy.get('[data-test="table-row"]:first-child td:first-child').should(
          'contain',
          gameNumber + displayGames
        );
      }
    );
  }
);

Cypress.Commands.add('checkCorrectHistoryActivePage', (activePage) => {
  cy.get('[data-test="pagination"]')
    .find('.pagination__page--is-active')
    .should('contain', activePage);
});

Cypress.Commands.add('checkCorrectHistoryPages', (page, displayGames) => {
  cy.get('[data-test="game-history-total-games"]').then(($games) => {
    const games = $games.attr('data-games');
    const pages = Math.ceil(games / displayGames);

    cy.get('[data-test="game-history-pages"]').should(
      'contain',
      `${page} / ${pages}`
    );
  });
});

Cypress.Commands.add('checkCorrectHistoryShowingGames', () => {
  cy.get('[data-test="table-row"]:first-child td:first-child').then(
    (cellFirst) => {
      const firstGameNumber = parseInt(cellFirst.text(), 10);

      cy.get('[data-test="table-row"]:last-child td:first-child').then(
        (cellLast) => {
          const lastGameNumber = parseInt(cellLast.text(), 10);

          cy.get('[data-test="game-history-showing-games"]').should(
            'contain',
            `Showing games ${firstGameNumber} to ${lastGameNumber}`
          );
        }
      );
    }
  );
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

Cypress.Commands.add('cacheStatValues', () => {
  cy.get('[data-test="stats-btn"]').click();

  cy.wait('@apiCheck');

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

addMatchImageSnapshotCommand({
  failureThreshold: 0.05, // threshold for entire image
  failureThresholdType: 'percent', // percent of image or number of pixels
});
