Cypress.Commands.add('checkMoveCount', (moves) => {
  cy.get('[data-test="moves"]').text().should('equal', `${moves}`);
});

Cypress.Commands.add('checkSummaryMoves', (moves) => {
  cy.get('[data-test="game-summary-value"]')
    .eq(1)
    .formatNumber()
    .should('equal', moves);
});
