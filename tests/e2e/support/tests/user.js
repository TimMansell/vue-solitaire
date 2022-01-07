Cypress.Commands.add('checkPlayerCount', () => {
  cy.getPlayerCount().then(({ players }) => {
    cy.waitUntil(() =>
      cy
        .get('[data-test="player-count"]')
        .formatNumber()
        .then((count) => count === players)
    );

    cy.checkPlayerNumber(players);
  });
});

Cypress.Commands.add('checkPlayerNumber', (players) =>
  cy.get('[data-test="player-count"]').formatNumber().should('equal', players)
);

Cypress.Commands.add('setUser', (uid) => localStorage.setItem('luid', uid));

Cypress.Commands.add('setDeck', (cards) => cy.task('populateDeck', cards));
