Cypress.Commands.add('visitApp', () => {
  cy.interceptInitialDataAPI();
  cy.interceptCreateUserAPI();
  cy.interceptHistoryAPI();
  cy.interceptLeaderboardAPI();
  cy.interceptStatsAPI();
  cy.interceptNewGameAPI();

  cy.visit('/');
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
    if (mockDeck) {
      cy.mockNewGameAPI(mockDeck);
    }

    if (mockInitial) {
      cy.mockInitialDataAPI(mockInitial);
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

  cy.setTimerPaused(true);

  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(300);
});

Cypress.Commands.add('setTimerPaused', (shouldPause) => {
  cy.window()
    .its('app.$store')
    .then((store) => {
      store.dispatch('setTimerPaused', shouldPause);
    });
});
