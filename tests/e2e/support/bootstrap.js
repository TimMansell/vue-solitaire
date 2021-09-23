Cypress.Commands.add('visitApp', () => {
  cy.interceptInitialDataAPI();
  cy.interceptCreateUserAPI();
  cy.interceptHistoryAPI();
  cy.interceptLeaderboardAPI();
  cy.interceptStatsAPI();
  cy.interceptNewGameAPI();

  cy.visit('/');

  cy.wait('@waitForInitialDataAPI');
});

Cypress.Commands.add(
  'mockApi',
  (
    { mockDeck, mockInitial, mockSaveGame, mockCreateUser, mockGetUser } = {
      mockDeck: [],
      mockInitial: false,
      mockSaveGame: false,
      mockCreateUser: false,
      mockGetUser: false,
    }
  ) => {
    cy.wrap(false).as('mockedInitial');

    if (mockDeck) {
      cy.mockNewGameAPI(mockDeck);
    }

    if (mockInitial) {
      cy.mockInitialDataAPI(mockInitial);
      cy.wrap(true).as('mockedInitial');
    }

    if (mockSaveGame) {
      cy.mockSaveGameAPI();
    }

    if (mockCreateUser) {
      cy.mockCreateUserAPI();
    }

    if (mockGetUser) {
      cy.mockGetUserAPI();
    }
  }
);

Cypress.Commands.add('clearTest', () => {
  cy.clearLocalStorage();
});
