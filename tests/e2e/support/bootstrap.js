Cypress.Commands.add('visitApp', (obj) => {
  cy.interceptInitialDataAPI();
  cy.interceptCreateUserAPI();
  cy.interceptHistoryAPI();
  cy.interceptLeaderboardAPI();
  cy.interceptStatsAPI();
  cy.interceptNewGameAPI();

  if (obj?.mockDeck) {
    cy.mockNewGameAPI(obj.mockDeck);
  }

  if (obj?.mockInitialApi) {
    cy.mockInitialDataAPI(obj.mockInitialApi);
  }

  if (obj?.mockApi) {
    cy.mockSaveGameAPI();
    cy.mockCreateUserAPI();
    cy.mockGetUserAPI();
  }

  cy.visit('/');

  if (!obj) {
    cy.wait('@waitForNewGameAPI');
  }
});

Cypress.Commands.add('clearTest', () => {
  cy.clearLocalStorage();

  cy.setTimerPaused(true);
});

Cypress.Commands.add('setTimerPaused', (shouldPause) => {
  cy.window()
    .its('app.$store')
    .then((store) => {
      store.dispatch('setTimerPaused', shouldPause);
    });
});
