Cypress.Commands.add('selectHistoryGames', (value) => {
  cy.get('[data-test="game-history"] [data-test="select"]').select(`${value}`);
});

Cypress.Commands.add('getSelectHistoryGames', () => {
  cy.get(
    '[data-test="game-history"] [data-test="select"] :selected'
  ).formatNumber();
});

Cypress.Commands.add('getHistoryTotalGames', () => {
  cy.get('[data-test="game-history-total-games"]').getData('games');
});

Cypress.Commands.add('selectLeaderboardTop', (value) => {
  cy.get('[data-test="leaderboard-set-top"] [data-test="select"]').select(
    `${value}`
  );
});

Cypress.Commands.add('selectLeaderboardBest', (value) => {
  cy.get('[data-test="leaderboard-set-best"] [data-test="select"]').select(
    value
  );
});

Cypress.Commands.add('getSelectLeaderboardTop', () => {
  cy.get('[data-test="leaderboard-set-top"] [data-test="select"] :selected');
});

Cypress.Commands.add('getSelectLeaderboardBest', () => {
  cy.get('[data-test="leaderboard-set-best"] [data-test="select"] :selected');
});
