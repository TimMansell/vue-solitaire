Cypress.Commands.add('waitForGameNumberToUpdate', () =>
  cy
    .get('[data-test="global-stats"]')
    .formatNumber()
    .then((number) => {
      cy.waitUntil(() =>
        cy
          .get('[data-test="global-stats"]')
          .formatNumber()
          .then((number2) => number2 !== number)
      );
    })
);
