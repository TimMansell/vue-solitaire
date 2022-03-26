Cypress.Commands.add('setServerDeck', (cards) => {
  const uid = localStorage.getItem('luid');

  cy.waitForBoard();

  cy.mockBoard(cards);

  cy.task('mockServerDeck', { cards, uid });
});

Cypress.Commands.add('setBoard', (cards) => {
  cy.waitForBoard();

  cy.mockBoard(cards);
});
