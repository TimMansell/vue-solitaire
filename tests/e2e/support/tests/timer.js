import { v4 as uuidv4 } from 'uuid';

Cypress.Commands.add('saveTimer', ({ wait } = { wait: 0 }) => {
  const timers = JSON.parse(localStorage.getItem('timers')) ?? [];
  const timerID = uuidv4();

  cy.wait(wait);

  cy.get('[data-test="timer"]').saveTextAs(timerID);

  localStorage.setItem('timers', JSON.stringify([...timers, timerID]));
});

Cypress.Commands.add('checkTimerIs', (time) =>
  cy.get('[data-test="timer"]').should('contain', time)
);

Cypress.Commands.add('checkTimerHasReset', () => cy.checkTimerIs('0:00:00'));

Cypress.Commands.add('checkTimer', () => {
  const [start] = JSON.parse(localStorage.getItem('timers'));

  cy.get(`@${start}`).then((timer) => {
    cy.get('[data-test="timer"]')
      .text()
      .should('equal', timer);
  });
});

Cypress.Commands.add('checkTimerIsPaused', () => {
  const [start, paused] = JSON.parse(localStorage.getItem('timers'));

  cy.get(`@${start}`).then((timerStart) => {
    cy.get(`@${paused}`).then((timerPaused) => {
      expect(timerStart).to.equal(timerPaused);
    });
  });
});

Cypress.Commands.add('checkTimerHasResumed', () => {
  const [start, paused, resumed] = JSON.parse(localStorage.getItem('timers'));

  cy.get(`@${start}`).then((timerStart) => {
    cy.get(`@${paused}`).then((timerPaused) => {
      cy.get(`@${resumed}`).then((timerResumed) => {
        expect(timerStart).to.equal(timerPaused);
        expect(timerPaused).to.not.equal(timerResumed);
      });
    });
  });
});

Cypress.Commands.add('checkTimerIsPausedOnReload', () => {
  cy.saveTimer({ wait: 1000 });

  cy.reloadAndWait();

  cy.saveTimer({ wait: 1000 });

  cy.checkTimerIsPaused();
});
