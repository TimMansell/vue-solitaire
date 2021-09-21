Cypress.Commands.add('savePlayerCount', () =>
  cy.get('[data-test="player-count"]').saveNumberAs('playerCount')
);

Cypress.Commands.add(
  'checkPlayerCount',
  ({ equal, incremented } = { equal: true, incremented: false }) => {
    const shouldEqual = equal ? 'equal' : 'not.equal';

    cy.get('@playerCount').then((playerCount) => {
      const checkCount = incremented ? playerCount + 1 : playerCount;

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(300);

      cy.get('[data-test="player-count"]')
        .formatNumber()
        .should(shouldEqual, checkCount);
    });
  }
);
