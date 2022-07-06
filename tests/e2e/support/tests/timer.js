Cypress.Commands.add('checkTimerIs', (time) => {
  cy.mockPaused(true);

  cy.get('[data-test="timer"]').text().should('equal', `0:00:0${time}`);

  cy.mockPaused(false);
});

Cypress.Commands.add('checkSummaryTime', (time) => {
  cy.get('[data-test="game-summary-value"]')
    .eq(0)
    .text()
    .should('equal', `0:00:0${time}`);
});

Cypress.Commands.add('checkTimerHasReset', () => cy.checkTimerIs(0));
