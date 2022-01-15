Cypress.Commands.add('setServerDeck', (cards) => {
  cy.waitForTimerToStart();

  cy.window()
    .its('solitaire.$store')
    .then((store) => {
      const uid = localStorage.getItem('luid');

      cy.task('mockServerDeck', { cards, uid }).then(() => {
        store.dispatch('initBoard', cards);
      });
    });
});

Cypress.Commands.add('setBoard', (cards) => {
  cy.waitForTimerToStart();

  cy.window()
    .its('solitaire.$store')
    .then((store) => {
      store.dispatch('initBoard', cards);
    });
});
