import fullGameDeck from '../../fixtures/decks/fullGame.json';
import incompleteGameDeck from '../../fixtures/decks/incompleteGame.json';
import incompleteGameMoves from '../../fixtures/moves/incompleteGame.json';

describe('Timer', () => {
  afterEach(() => {
    cy.clearTest();
  });

  describe('Default Functionality', () => {
    beforeEach(() => {
      cy.visitApp({ mockDeck: fullGameDeck, mockApi: true });
    });

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
      cy.visitApp({ mockDeck: fullGameDeck, mockApi: true });

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
      cy.visitApp({ mockDeck: fullGameDeck, mockApi: true });

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
      cy.visitApp({ mockDeck: fullGameDeck, mockApi: true });

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

    it('timer should start paused when game lost overlay is open and page is refreshed', () => {
      cy.visitApp({ mockDeck: incompleteGameDeck, mockApi: true });

      cy.runGameWithClicks(incompleteGameMoves);

      cy.get('[data-test="timer"]').then(($timerStart) => {
        const startNumber = $timerStart.text();

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
      cy.visitApp({ mockDeck: fullGameDeck, mockApi: true });

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
      cy.visitApp({ mockDeck: fullGameDeck, mockApi: true });

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
      cy.visitApp({ mockDeck: fullGameDeck, mockApi: true });

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
      cy.visitApp({ mockDeck: fullGameDeck, mockApi: true });

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000);

      cy.startNewGame();

      cy.get('[data-test="timer"]').should('contain', '0:00:00');
    });

    it('it stops timer when game is lost and resets when new game is started', () => {
      cy.visitApp({ mockDeck: incompleteGameDeck, mockApi: true });

      cy.runGameWithClicks(incompleteGameMoves);

      cy.get('[data-test="timer"]').then(($timerStart) => {
        const startNumber = $timerStart.text();

        cy.get('[data-test="timer"]').then(($timerPaused) => {
          const pausedNumber = $timerPaused.text();

          expect(startNumber).to.equal(pausedNumber);
        });

        cy.confirmNewGame();

        cy.get('[data-test="timer"]').should('contain', '0:00:00');
      });
    });
  });
});
