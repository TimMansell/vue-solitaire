Cypress.Commands.add('interceptLeaderboardAPI', () => {
  cy.intercept('POST', '.netlify/functions/graphql', (req) => {
    const { body } = req;

    if (body?.query.includes('query Leaderboards')) {
      // eslint-disable-next-line no-param-reassign
      req.alias = 'waitForLeaderboardAPI';
    }
  });
});

Cypress.Commands.add('interceptInitialDataAPI', () => {
  cy.intercept('POST', '.netlify/functions/graphql', (req) => {
    const { body } = req;

    if (body?.query.includes('query GetInitialData')) {
      // eslint-disable-next-line no-param-reassign
      req.alias = 'waitForInitialDataAPI';
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

    if (body?.query.includes('mutation NewGame')) {
      // eslint-disable-next-line no-param-reassign
      req.alias = 'waitForNewGameAPI';
    }
  });
});

Cypress.Commands.add('mockInitialDataAPI', ({ version }) => {
  cy.intercept('POST', '.netlify/functions/graphql', (req) => {
    const { body } = req;

    console.log({ version });

    if (body?.query.includes('query GetInitialData')) {
      req.reply({
        data: {
          user: {
            exists: true,
            name: 'ExpectedAmberWoodpecker',
          },
          userStats: {
            completed: 17,
          },
          globalStats: {
            completed: 17942,
            players: 3544,
          },
          version,
        },
      });
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
