import { mockStats, mockPlayerName } from '../../../../src/mockData';

const mockAPI = (operationName, data) =>
  cy.intercept('POST', '.netlify/functions/graphql', (request) => {
    const { body } = request;

    if (body?.operationName === operationName) {
      request.reply({
        data,
      });
    }
  });

Cypress.Commands.add(
  'mockApi',
  (
    { mockDeck, mockInitial, mockSaveGame, mockCreateUser } = {
      mockDeck: [],
      mockInitial: false,
      mockSaveGame: false,
      mockCreateUser: false,
    }
  ) => {
    cy.wrap(false).as('mockedInitial');

    if (mockDeck) {
      cy.mockNewGameAPI(mockDeck);
    }

    if (mockInitial) {
      cy.mockGetInitialDataAPI(mockInitial);
      cy.wrap(true).as('mockedInitial');
    }

    if (mockSaveGame) {
      cy.mockSaveGameAPI();
    }

    if (mockCreateUser) {
      cy.mockCreateAUserAPI();
    }
  }
);

Cypress.Commands.add('mockGetInitialDataAPI', ({ matchesVersion = true }) =>
  mockAPI('GetInitialData', {
    user: {
      exists: false,
      name: '',
    },
    userStats: {
      ...mockStats,
    },
    globalStats: {
      ...mockStats,
    },
    version: { matches: matchesVersion },
  })
);

Cypress.Commands.add('mockNewGameAPI', (cards) =>
  mockAPI('NewGame', { newGame: { cards } })
);

Cypress.Commands.add('mockSaveGameAPI', () =>
  mockAPI('SaveGame', { saveGame: { outcome: 'Gave Up' } })
);

Cypress.Commands.add('mockCreateAUserAPI', () =>
  mockAPI('CreateAUser', { createUser: { name: mockPlayerName } })
);
