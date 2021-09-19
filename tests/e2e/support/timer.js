Cypress.Commands.add('saveTimer', ({ alias = 'timer', wait = 0 }) => {
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(wait);

  cy.get('[data-test="timer"]').saveTextAs(alias);
});

Cypress.Commands.add('checkTimerHasReset', () =>
  cy.get('[data-test="timer"]').should('contain', '0:00:00')
);

Cypress.Commands.add('checkTimer', () => {
  cy.get('@timer').then((timer) => {
    cy.get('[data-test="timer"]')
      .text()
      .should('equal', timer);
  });
});

Cypress.Commands.add('checkTimerPaused', ({ start, paused }) => {
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

Cypress.Commands.add('checkReloadTimer', () => {
  cy.saveTimer({ alias: 'timerStart', wait: 1000 });

  cy.reloadAndWait();

  cy.saveTimer({ alias: 'timerPaused', wait: 1000 });

  cy.checkTimerPaused({
    start: 'timerStart',
    paused: 'timerPaused',
  });
});
