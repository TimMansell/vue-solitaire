Cypress.Commands.add('saveTimer', ({ alias, wait = 0 }) => {
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(wait);

  cy.get('[data-test="timer"]')
    .then(($timer) => $timer.text())
    .then(($text) => cy.wrap($text).as(alias));
});

Cypress.Commands.add('checkTimer', ({ start, paused }) => {
  cy.get(`@${start}`).then((timerStart) => {
    cy.get(`@${paused}`).then((timerPaused) => {
      expect(timerStart).to.equal(timerPaused);
    });
  });
});

Cypress.Commands.add('checkTimerResumed', ({ start, paused, resumed }) => {
  cy.get(`@${start}`).then((timerStart) => {
    cy.get(`@${paused}`).then((timerPaused) => {
      cy.get(`@${resumed}`).then((timerResumed) => {
        expect(timerStart).to.equal(timerPaused);
        expect(timerPaused).to.not.equal(timerResumed);
      });
    });
  });
});
