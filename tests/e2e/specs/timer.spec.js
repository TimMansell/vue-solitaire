import fullGameDeck from '../../fixtures/decks/fullGame.json';

describe('Timer', () => {
  beforeEach(() => {
    cy.mockApi({
      mockDeck: fullGameDeck,
      mockInitial: true,
    });

    cy.visitApp();
  });

  afterEach(() => {
    cy.clearTest();
  });

  describe('Default Functionality', () => {
    it('timer stops when game is paused and starts when resumed', () => {
      cy.get('[data-test="timer"]').then(($timerStart) => {
        const startNumber = $timerStart.text();

        cy.pauseGame();

        cy.get('[data-test="timer"]').then(($timerPaused) => {
          const pausedNumber = $timerPaused.text();

          cy.resumeGame();

          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(1000);

          cy.get('[data-test="timer"]').then(($timerResumed) => {
            const resumedNumber = $timerResumed.text();

            expect(startNumber).to.equal(pausedNumber);
            expect(pausedNumber).to.not.equal(resumedNumber);
          });
        });
      });
    });

    it('it should increment timer correctly', () => {
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(2000);

      cy.get('[data-test="timer"]').should('contain', '0:00:03');
    });

    it('it should pause timer after new game then pause game', () => {
      cy.startNewGame();

      cy.pauseGame();

      cy.get('[data-test="timer"]').then(($timerStart) => {
        const startNumber = $timerStart.text();

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000);

        cy.get('[data-test="timer"]').then(($timerPaused) => {
          const pausedNumber = $timerPaused.text();

          expect(startNumber).to.equal(pausedNumber);
        });
      });
    });

    it('it should increment timer correctly after pausing', () => {
      cy.pauseGame();

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000);

      cy.resumeGame();

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(2000);

      cy.get('[data-test="timer"]').should('contain', '0:00:03');
    });

    it('timer should pause when page is automatically hidden', () => {
      cy.document().then((doc) => {
        cy.stub(doc, 'visibilityState').value('hidden');
      });

      cy.document().trigger('visibilitychange');

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(2000);

      cy.resumeGame();

      cy.get('[data-test="timer"]').should('contain', '0:00:03');
    });
  });

  describe('Refreshing page', () => {
    it('timer should start paused when game is paused and page is refreshed', () => {
      cy.get('[data-test="timer"]').then(($timerStart) => {
        const startNumber = $timerStart.text();

        cy.pauseGame();

        cy.reload();

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000);

        cy.get('[data-test="timer"]').then(($timerEnd) => {
          const endNumber = $timerEnd.text();

          expect(startNumber).to.equal(endNumber);
        });
      });
    });

    it('timer should start paused when stats overlay is open and page is refreshed', () => {
      cy.get('[data-test="timer"]').then(($timerStart) => {
        const startNumber = $timerStart.text();

        cy.showStats();

        cy.reload();

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000);

        cy.get('[data-test="timer"]').then(($timerEnd) => {
          const endNumber = $timerEnd.text();

          expect(startNumber).to.equal(endNumber);
        });
      });
    });

    it('timer should start paused when how to play overlay is open and page is refreshed', () => {
      cy.get('[data-test="timer"]').then(($timerStart) => {
        const startNumber = $timerStart.text();

        cy.showRules();

        cy.reload();

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000);

        cy.get('[data-test="timer"]').then(($timerEnd) => {
          const endNumber = $timerEnd.text();

          expect(startNumber).to.equal(endNumber);
        });
      });
    });

    it('timer should start paused when new game overlay is open and page is refreshed', () => {
      cy.get('[data-test="timer"]').then(($timerStart) => {
        const startNumber = $timerStart.text();

        cy.newGame();

        cy.reload();

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000);

        cy.get('[data-test="timer"]').then(($timerEnd) => {
          const endNumber = $timerEnd.text();

          expect(startNumber).to.equal(endNumber);
        });
      });
    });
  });

  describe('Resuming Timer', () => {
    it('timer stops when stats overlay is open and starts when resumed', () => {
      cy.get('[data-test="timer"]').then(($timerStart) => {
        const startNumber = $timerStart.text();

        cy.showStats();

        cy.get('[data-test="timer"]').then(($timerPaused) => {
          const pausedNumber = $timerPaused.text();

          cy.closeOverlay();

          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(1000);

          cy.get('[data-test="timer"]').then(($timerResumed) => {
            const resumedNumber = $timerResumed.text();

            expect(startNumber).to.equal(pausedNumber);
            expect(pausedNumber).to.not.equal(resumedNumber);
          });
        });
      });
    });

    it('timer stops when new game overlay is open and starts when resumed', () => {
      cy.get('[data-test="timer"]').then(($timerStart) => {
        const startNumber = $timerStart.text();

        cy.newGame();

        cy.get('[data-test="timer"]').then(($timerPaused) => {
          const pausedNumber = $timerPaused.text();

          cy.continueGame();

          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(1000);

          cy.get('[data-test="timer"]').then(($timerResumed) => {
            const resumedNumber = $timerResumed.text();

            expect(startNumber).to.equal(pausedNumber);
            expect(pausedNumber).to.not.equal(resumedNumber);
          });
        });
      });
    });
  });

  describe('Resetting timer', () => {
    it('it should reset timer when new game is pressed', () => {
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000);

      cy.startNewGame();

      cy.get('[data-test="timer"]').should('contain', '0:00:00');
    });
  });
});
