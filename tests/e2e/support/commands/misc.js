Cypress.Commands.add('clearTest', () => {
  cy.window()
    .its('solitaire.$store')
    .then((store) => {
      store.dispatch('setGamePaused', true);
    });
});
