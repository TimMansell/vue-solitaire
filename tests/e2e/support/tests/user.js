Cypress.Commands.add('checkPlayerCount', () => {
  cy.waitUntil(() =>
    cy
      .get('[data-test="player-count"]')
      .formatNumber()
      .then((count) => count !== 0)
  );

  cy.getPlayerCount().then(({ players }) => {
    cy.get('[data-test="player-count"]')
      .formatNumber()
      .should('equal', players);
  });
});

Cypress.Commands.add('setUser', (uid) => localStorage.setItem('luid', uid));

Cypress.Commands.add('setDeck', (cards) => cy.task('populateDeck', cards));
