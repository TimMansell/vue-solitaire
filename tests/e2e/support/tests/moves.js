Cypress.Commands.add('checkMoveCount', (moves) => {
  cy.get('[data-test="moves"]').text().should('equal', `${moves}`);
});

Cypress.Commands.add('saveMoves', () =>
  cy.get('[data-test="moves"]').saveTextAs('moves')
);

Cypress.Commands.add('checkMoves', () => {
  cy.get('@moves').then((moves) => {
    cy.checkMoveCount(moves);
  });
});

Cypress.Commands.add('checkSummaryMoves', (moves) => {
  cy.get('[data-test="game-summary-value"]')
    .eq(1)
    .formatNumber()
    .should('equal', moves);
});
