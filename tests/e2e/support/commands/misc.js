Cypress.Commands.add('clearTest', () => {
  cy.window()
    .its('app.$store')
    .then((store) => {
      store.dispatch('setGamePaused', true);
    });

  cy.clearLocalStorage();
});
