Cypress.Commands.add('waitForTimerToStart', () =>
  cy.waitUntil(() =>
    cy
      .get('[data-test="timer"]')
      .text()
      .then((timer) => timer === '0:00:01')
  )
);

Cypress.Commands.add('checkTimerIs', (time) => {
  cy.get('[data-test="timer"]').saveTextAs('timer');

  cy.get('@timer').then((timer) => {
    expect(timer).to.equal(`0:00:0${time}`);
  });
});

Cypress.Commands.add('checkSummaryTime', (time) => {
  cy.get('[data-test="game-summary-value"]')
    .eq(0)
    .text()
    .should('equal', `0:00:0${time}`);
});

Cypress.Commands.add('checkTimerHasReset', () => cy.checkTimerIs(0));
