import foundations from '../../fixtures/boards/fullFoundation.json';
import noMovesKingColumn from '../../fixtures/boards/noMovesKingColumn.json';

describe('Timer', () => {
  beforeEach(() => {
    cy.visitApp();
  });

  afterEach(() => {
    cy.clearLocalStorage();
  });

  describe('Default Functionality', () => {
    it('timer stops when game is paused and starts when resumed', () => {
      cy.get('[data-test="timer"]').then(($timerStart) => {
        const startNumber = $timerStart.text();

        cy.get('[data-test="pause-game-btn"]').click();

        cy.get('[data-test="timer"]').then(($timerPaused) => {
          const pausedNumber = $timerPaused.text();

          cy.get('[data-test="game-overlay-btns"]').within(() => {
            cy.get('[data-test="pause-game-btn"]').click();
          });

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
      cy.wait(3000);

      cy.get('[data-test="timer"]').should('contain', '0:00:04');
    });

    it('it should increment timer correctly after pausing', () => {
      cy.get('[data-test="pause-game-btn"]').click();

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000);

      cy.get('[data-test="game-overlay-btns"]').within(() => {
        cy.get('[data-test="pause-game-btn"]').click();
      });

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
      cy.wait(4000);

      cy.get('[data-test="game-overlay-btns"]').within(() => {
        cy.get('[data-test="pause-game-btn"]').click();
      });

      cy.get('[data-test="timer"]').should('contain', '0:00:03');
    });
  });

  describe('Refreshing page', () => {
    it('timer should start paused when game is paused and page is refreshed', () => {
      cy.get('[data-test="timer"]').then(($timerStart) => {
        const startNumber = $timerStart.text();

        cy.get('[data-test="pause-game-btn"]').click();

        cy.reloadAndWait();

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

        cy.get('[data-test="stats-btn"]').click();

        cy.reloadAndWait();

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

        cy.get('[data-test="game-rules-btn"]').click();

        cy.reloadAndWait();

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000);

        cy.get('[data-test="timer"]').then(($timerEnd) => {
          const endNumber = $timerEnd.text();

          expect(startNumber).to.equal(endNumber);
        });
      });
    });

    it('timer should start paused when game lost overlay is open and page is refreshed', () => {
      cy.setBoard(noMovesKingColumn).then(() => {
        cy.get('[data-test="card-K♣"]').clickTo('[data-test="column-1"]');
        cy.get('[data-test="card-Q♣"]').clickTo('[data-test="card-K♣"]');

        cy.get('[data-test="timer"]').then(($timerStart) => {
          const startNumber = $timerStart.text();

          cy.reloadAndWait();

          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(1000);

          cy.get('[data-test="timer"]').then(($timerEnd) => {
            const endNumber = $timerEnd.text();

            expect(startNumber).to.equal(endNumber);
          });
        });
      });
    });

    it('timer should start paused when game won overlay is open and page is refreshed', () => {
      cy.setBoard(foundations).then(() => {
        cy.get('[data-test="card-Q♠"]').clickTo('[data-test="foundation-3"]');
        cy.get('[data-test="card-K♠"]').clickTo('[data-test="foundation-3"]');

        cy.get('[data-test="timer"]').then(($timerStart) => {
          const startNumber = $timerStart.text();

          cy.reloadAndWait();

          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(1000);

          cy.get('[data-test="timer"]').then(($timerEnd) => {
            const endNumber = $timerEnd.text();

            expect(startNumber).to.equal(endNumber);
          });
        });
      });
    });

    it('timer should start paused when new game overlay is open and page is refreshed', () => {
      cy.setBoard(foundations).then(() => {
        cy.get('[data-test="timer"]').then(($timerStart) => {
          const startNumber = $timerStart.text();

          cy.get('[data-test="new-game-btn"]').click();

          cy.reloadAndWait();

          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(1000);

          cy.get('[data-test="timer"]').then(($timerEnd) => {
            const endNumber = $timerEnd.text();

            expect(startNumber).to.equal(endNumber);
          });
        });
      });
    });
  });

  describe('Resuming Timer', () => {
    it('timer stops when stats overlay is open and starts when resumed', () => {
      cy.get('[data-test="timer"]').then(($timerStart) => {
        const startNumber = $timerStart.text();

        cy.get('[data-test="stats-btn"]').click();

        cy.wait('@waitForStatsAPI');

        cy.get('[data-test="timer"]').then(($timerPaused) => {
          const pausedNumber = $timerPaused.text();

          cy.get('[data-test="game-overlay-close-btn"]').click();

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

        cy.get('[data-test="new-game-btn"]').click();

        cy.get('[data-test="timer"]').then(($timerPaused) => {
          const pausedNumber = $timerPaused.text();

          cy.get('[data-test="game-overlay-btns"]').within(() => {
            cy.get('[data-test="continue-game-btn"]').click();
          });

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
      cy.newGame();

      cy.get('[data-test="timer"]').should('contain', '0:00:00');
    });

    it('it stops timer when game is lost and resets when new game is started', () => {
      cy.setBoard(noMovesKingColumn).then(() => {
        cy.get('[data-test="card-K♣"]').clickTo('[data-test="column-1"]');
        cy.get('[data-test="card-Q♣"]').clickTo('[data-test="card-K♣"]');

        cy.get('[data-test="timer"]').then(($timerStart) => {
          const startNumber = $timerStart.text();

          cy.get('[data-test="timer"]').then(($timerPaused) => {
            const pausedNumber = $timerPaused.text();

            expect(startNumber).to.equal(pausedNumber);
          });

          cy.get('[data-test="game-lost"]').within(() => {
            cy.get('[data-test="new-game-btn"]').click();
          });

          cy.get('[data-test="timer"]').should('contain', '0:00:00');
        });
      });
    });

    it('it stops timer when game is won and resets when new game is started', () => {
      cy.setBoard(foundations).then(() => {
        cy.get('[data-test="card-Q♠"]').clickTo('[data-test="foundation-3"]');
        cy.get('[data-test="card-K♠"]').clickTo('[data-test="foundation-3"]');

        cy.get('[data-test="timer"]').then(($timerStart) => {
          const startNumber = $timerStart.text();

          cy.get('[data-test="timer"]').then(($timerPaused) => {
            const pausedNumber = $timerPaused.text();

            expect(startNumber).to.equal(pausedNumber);
          });

          cy.get('[data-test="game-won"]').within(() => {
            cy.get('[data-test="new-game-btn"]').click();
          });

          cy.get('[data-test="timer"]').should('contain', '0:00:00');
        });
      });
    });
  });
});
