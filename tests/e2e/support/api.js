Cypress.Commands.add('interceptVersionAPI', ({ matches }) => {
  cy.intercept('POST', '.netlify/functions/graphql', (req) => {
    const { body } = req;

    if (body?.query.includes('version')) {
      // eslint-disable-next-line no-param-reassign
      req.alias = 'waitForVersionAPI';

      req.reply({
        data: { version: { matches } },
      });
    }
  });
});

Cypress.Commands.add('interceptLeaderboardAPI', () => {
  cy.intercept('POST', '.netlify/functions/graphql', (req) => {
    const { body } = req;

    if (body?.query.includes('query Leaderboards')) {
      // eslint-disable-next-line no-param-reassign
      req.alias = 'waitForLeaderboardAPI';
    }
  });
});

Cypress.Commands.add('interceptStatsAPI', () => {
  cy.intercept('POST', '.netlify/functions/graphql', (req) => {
    const { body } = req;

    if (body?.query.includes('query GetStats')) {
      // eslint-disable-next-line no-param-reassign
      req.alias = 'waitForStatsAPI';
    }
  });
});

Cypress.Commands.add('interceptCreateUserAPI', () => {
  cy.intercept('POST', '.netlify/functions/graphql', (req) => {
    const { body } = req;

    if (body?.query.includes('mutation CreateAUser')) {
      // eslint-disable-next-line no-param-reassign
      req.alias = 'waitForCreateUserAPI';
    }
  });
});

Cypress.Commands.add('interceptHistoryAPI', () => {
  cy.intercept('POST', '.netlify/functions/graphql', (req) => {
    const { body } = req;

    if (body?.query.includes('history')) {
      // eslint-disable-next-line no-param-reassign
      req.alias = 'waitForHistoryAPI';
    }
  });
});

Cypress.Commands.add('interceptNewGameAPI', (cards) => {
  cy.intercept('POST', '.netlify/functions/graphql', (req) => {
    const { body } = req;

    if (body?.query.includes('newGame')) {
      req.reply({
        data: {
          newGame: {
            cards,
          },
        },
      });
    }
  });
});
