describe('Timer', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('timer stops when game is paused and starts when resumed', () => {
    cy.wait(1000);

    cy.get('[data-test="timer"]').then(($timerStart) => {
      const startNumber = $timerStart.text();

      cy.get('[data-test="pause-game-btn"]').click();

      cy.wait(2000);

      cy.get('[data-test="timer"]').then(($timerPaused) => {
        const pausedNumber = $timerPaused.text();

        cy.get('[data-test="game-overlay-btn"]').within(() => {
          cy.get('[data-test="pause-game-btn"]').click();
        });

        cy.wait(2000);

        cy.get('[data-test="timer"]').then(($timerResumed) => {
          const resumedNumber = $timerResumed.text();

          expect(startNumber).to.equal(pausedNumber);
          expect(pausedNumber).to.not.equal(resumedNumber);
        });
      });
    });
  });

  it('it should reset timer', () => {
    cy.wait(1000);

    cy.get('[data-test="timer"]').then(() => {
      cy.get('[data-test="new-game-btn"]').click();

      cy.get('[data-test="timer"]').then(($timerRestart) => {
        const number = parseInt($timerRestart.text(), 10);

        expect(number).to.be.equal(0);
      });
    });
  });

  it('it should increment timer correctly', () => {
    cy.wait(4000);

    cy.get('[data-test="timer"]').then(($timer) => {
      const number = parseInt($timer.text(), 10);

      expect(number).to.be.equal(5);
    });
  });

  it('it should increment timer correctly after pausing', () => {
    cy.wait(1000);

    cy.get('[data-test="pause-game-btn"]').click();

    cy.wait(1000);

    cy.get('[data-test="game-overlay-btn"]').within(() => {
      cy.get('[data-test="pause-game-btn"]').click();
    });

    cy.wait(4000);

    cy.get('[data-test="timer"]').then(($timer) => {
      const number = parseInt($timer.text(), 10);

      expect(number).to.be.equal(5);
    });
  });
});
