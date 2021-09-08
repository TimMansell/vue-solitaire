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

Cypress.Commands.add('interceptNewGameAPI', () => {
  cy.intercept('POST', '.netlify/functions/graphql', (req) => {
    const { body } = req;

    if (body?.query.includes('newGame')) {
      // eslint-disable-next-line no-param-reassign
      req.alias = 'waitForNewGameAPI';
    }
  });
});

Cypress.Commands.add('mockNewGameAPI', (cards) => {
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

Cypress.Commands.add('mockStatsAPI', () => {
  cy.intercept('POST', '.netlify/functions/graphql', (req) => {
    const { body } = req;

    if (body?.query.includes('GetStats')) {
      req.reply({
        data: {
          userStats: { completed: 1 },
          globalStats: { completed: 1, players: 1 },
        },
      });
    }
  });
});

Cypress.Commands.add('mockSaveGameAPI', () => {
  cy.intercept('POST', '.netlify/functions/graphql', (req) => {
    const { body } = req;

    if (body?.query.includes('saveGame')) {
      req.reply({ data: { saveGame: { outcome: 'Gave Up' } } });
    }
  });
});

Cypress.Commands.add('mockCreateUserAPI', () => {
  cy.intercept('POST', '.netlify/functions/graphql', (req) => {
    const { body } = req;

    if (body?.query.includes('createUser')) {
      req.reply({
        data: { createUser: { name: 'PhilosophicalAmethystHoverfly' } },
      });
    }
  });
});

Cypress.Commands.add('mockGetUserAPI', () => {
  cy.intercept('POST', '.netlify/functions/graphql', (req) => {
    const { body } = req;

    if (body?.query.includes('query User')) {
      req.reply({
        data: { user: { exists: true, name: 'PhilosophicalAmethystHoverfly' } },
      });
    }
  });
});

Cypress.Commands.add('mockVersionAPI', () => {
  cy.intercept('POST', '.netlify/functions/graphql', (req) => {
    const { body } = req;

    if (body?.query.includes('version')) {
      req.reply({ data: { version: { matches: true } } });
    }
  });
});
