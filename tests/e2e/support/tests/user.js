Cypress.Commands.add('checkPlayerCount', () => {
  cy.getPlayerCount();

  cy.get('@playerCount').then(({ players }) => {
    cy.get('[data-test="player-count"]')
      .formatNumber()
      .should('equal', players);
  });
});

Cypress.Commands.add('setUser', (uid) => localStorage.setItem('luid', uid));

Cypress.Commands.add('setDeck', (cards) => {
  const uid = localStorage.getItem('luid');

  cy.task('populateDeck', { cards, uid });
});
