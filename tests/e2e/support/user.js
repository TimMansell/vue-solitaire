Cypress.Commands.add('checkPlayerCount', ({ count, shouldEqual = true }) => {
  const equal = shouldEqual ? 'equal' : 'not.equal';

  cy.get('[data-test="player-count"]')
    .text()
    .should(equal, `${count}`);
});
