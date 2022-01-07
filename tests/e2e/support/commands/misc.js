Cypress.Commands.add('clearTest', () => {
  cy.window()
    .its('solitaire.$store')
    .then((store) => {
      store.dispatch('setGamePaused', true);
    });

  cy.clearLocalStorage();
});

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
