Cypress.Commands.add('savePlayerCount', () =>
  cy.get('[data-test="player-count"]').saveNumberAs('playerCount')
);

Cypress.Commands.add('checkPlayerCount', () => {
  cy.get('[data-test="player-count"]')
    .formatNumber()
    .should('not.equal', 0);
});

Cypress.Commands.add('checkPlayerCountHasIncremented', (hasIncremented) => {
  cy.get('@playerCount').then((playerCount) => {
    const checkCount = hasIncremented ? playerCount + 1 : playerCount;

    cy.get('[data-test="player-count"]')
      .formatNumber()
      .should('equal', checkCount);
  });
});

Cypress.Commands.add('setUser', (uid) => localStorage.setItem('luid', uid));

Cypress.Commands.add('setDeck', (cards) => {
  const uid = localStorage.getItem('luid');

  cy.task('populateDeck', { cards, uid });
});
