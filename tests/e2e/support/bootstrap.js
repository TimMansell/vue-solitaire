Cypress.Commands.add('visitApp', ({ waitInitial } = { waitInitial: false }) => {
  cy.interceptInitialDataAPI();
  cy.interceptCreateUserAPI();
  cy.interceptHistoryAPI();
  cy.interceptLeaderboardAPI();
  cy.interceptStatsAPI();
  cy.interceptNewGameAPI();

  cy.visit('/');

  if (waitInitial) {
    cy.wait('@waitForInitialDataAPI');
  }
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
      const luid = localStorage.getItem('luid');

      cy.mockNewGameAPI(mockDeck);

      if (luid) {
        cy.task('populateDeck', [mockDeck, luid]);
      }
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

  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(300);
});
