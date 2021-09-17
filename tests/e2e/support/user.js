Cypress.Commands.add('checkPlayerCount', (count) => {
  cy.get('[data-test="player-count"]')
    .text()
    .should('equal', `${count}`);
});
