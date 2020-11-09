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
    });

    cy.get('[data-test="timer"]').should('contain', '0:00:00');
  });

  it('it should increment timer correctly', () => {
    cy.wait(4000);

    cy.get('[data-test="timer"]').should('contain', '0:00:04');
  });

  it('it should increment timer correctly after pausing', () => {
    cy.wait(1000);

    cy.get('[data-test="pause-game-btn"]').click();

    cy.wait(1000);

    cy.get('[data-test="game-overlay-btn"]').within(() => {
      cy.get('[data-test="pause-game-btn"]').click();
    });

    cy.wait(4000);

    cy.get('[data-test="timer"]').should('contain', '0:00:05');
  });

  it('timer should pause when page is automatically hidden', () => {
    cy.document().then((doc) => {
      cy.stub(doc, 'visibilityState').value('hidden');
    });

    cy.document().trigger('visibilitychange');

    cy.wait(4000);

    cy.get('[data-test="game-overlay-btn"]').within(() => {
      cy.get('[data-test="pause-game-btn"]').click();
    });

    cy.get('[data-test="timer"]').should('contain', '0:00:02');
  });

  it('timer should start paused when game is paused and page is refreshed', () => {
    cy.get('[data-test="timer"]').then(($timerStart) => {
      const startNumber = $timerStart.text();

      cy.get('[data-test="pause-game-btn"]').click();

      cy.reload();

      cy.wait(2000);

      cy.get('[data-test="timer"]').then(($timerEnd) => {
        const endNumber = $timerEnd.text();

        expect(startNumber).to.equal(endNumber);
      });
    });
  });
});
