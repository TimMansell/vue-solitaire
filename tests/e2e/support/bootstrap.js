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
    const { mockVersion } = obj;

    cy.mockInitialDataAPI({ matchesVersion: mockVersion });
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
