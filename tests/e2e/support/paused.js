Cypress.Commands.add('checkGamePaused', (isPaused) => {
  const exist = isPaused ? 'exist' : 'not.exist';

  cy.get('[data-test="game-paused"]').should(exist);
});
