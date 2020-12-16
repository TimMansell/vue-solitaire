import foundations from '../../fixtures/boards/fullFoundation.json';
import noMovesKingColumn from '../../fixtures/boards/noMovesKingColumn.json';

describe('Timer', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Default Functionality', () => {
    it('timer stops when game is paused and starts when resumed', () => {
      cy.wait(1000);

      cy.get('[data-test="timer"]').then(($timerStart) => {
        const startNumber = $timerStart.text();

        cy.get('[data-test="pause-game-btn"]').click();

        cy.wait(2000);

        cy.get('[data-test="timer"]').then(($timerPaused) => {
          const pausedNumber = $timerPaused.text();

          cy.get('[data-test="game-overlay-btns"]').within(() => {
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

    it('it should increment timer correctly', () => {
      cy.wait(4000);

      cy.get('[data-test="timer"]').should('contain', '0:00:04');
    });

    it('it should increment timer correctly after pausing', () => {
      cy.wait(1000);

      cy.get('[data-test="pause-game-btn"]').click();

      cy.wait(1000);

      cy.get('[data-test="game-overlay-btns"]').within(() => {
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

      cy.get('[data-test="game-overlay-btns"]').within(() => {
        cy.get('[data-test="pause-game-btn"]').click();
      });

      cy.get('[data-test="timer"]').should('contain', '0:00:02');
    });
  });

  describe('Refreshing page', () => {
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

    it('timer should start paused when user stats overlay is open and page is refreshed', () => {
      cy.get('[data-test="timer"]').then(($timerStart) => {
        const startNumber = $timerStart.text();

        cy.get('[data-test="user-stats-btn"]').click();

        cy.reload();

        cy.wait(2000);

        cy.get('[data-test="timer"]').then(($timerEnd) => {
          const endNumber = $timerEnd.text();

          expect(startNumber).to.equal(endNumber);
        });
      });
    });

    it('timer should start paused when global stats overlay is open and page is refreshed', () => {
      cy.get('[data-test="timer"]').then(($timerStart) => {
        const startNumber = $timerStart.text();

        cy.get('[data-test="global-stats-btn"]').click();

        cy.reload();

        cy.wait(2000);

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

        cy.reload();

        cy.wait(2000);

        cy.get('[data-test="timer"]').then(($timerEnd) => {
          const endNumber = $timerEnd.text();

          expect(startNumber).to.equal(endNumber);
        });
      });
    });

    it('timer should start paused when game lost overlay is open and page is refreshed', () => {
      cy.setBoard(noMovesKingColumn).then(() => {
        cy.wait(1000);

        cy.get('[data-test="card-K♣"]').clickTo('[data-test="column-1"]');
        cy.get('[data-test="card-Q♣"]').clickTo('[data-test="card-K♣"]');

        cy.get('[data-test="timer"]').then(($timerStart) => {
          const startNumber = $timerStart.text();

          cy.reload();

          cy.wait(2000);

          cy.get('[data-test="timer"]').then(($timerEnd) => {
            const endNumber = $timerEnd.text();

            expect(startNumber).to.equal(endNumber);
          });
        });
      });
    });

    it('timer should start paused when game won overlay is open and page is refreshed', () => {
      cy.setBoard(foundations).then(() => {
        cy.wait(1000);

        cy.get('[data-test="card-Q♠"]').clickTo('[data-test="foundation-3"]');
        cy.get('[data-test="card-K♠"]').clickTo('[data-test="foundation-3"]');

        cy.get('[data-test="timer"]').then(($timerStart) => {
          const startNumber = $timerStart.text();

          cy.reload();

          cy.wait(2000);

          cy.get('[data-test="timer"]').then(($timerEnd) => {
            const endNumber = $timerEnd.text();

            expect(startNumber).to.equal(endNumber);
          });
        });
      });
    });

    it('timer should start paused when new game overlay is open and page is refreshed', () => {
      cy.setBoard(foundations).then(() => {
        cy.wait(1000);

        cy.get('[data-test="timer"]').then(($timerStart) => {
          const startNumber = $timerStart.text();

          cy.get('[data-test="new-game-btn"]').click();

          cy.reload();

          cy.wait(2000);

          cy.get('[data-test="timer"]').then(($timerEnd) => {
            const endNumber = $timerEnd.text();

            expect(startNumber).to.equal(endNumber);
          });
        });
      });
    });
  });

  describe('Resuming Timer', () => {
    it('timer stops when user stats overlay is open and starts when resumed', () => {
      cy.wait(1000);

      cy.get('[data-test="timer"]').then(($timerStart) => {
        const startNumber = $timerStart.text();

        cy.get('[data-test="user-stats-btn"]').click();

        cy.wait(2000);

        cy.get('[data-test="timer"]').then(($timerPaused) => {
          const pausedNumber = $timerPaused.text();

          cy.get('[data-test="game-overlay-btns"]').within(() => {
            cy.get('[data-test="close-stats-btn"]').click();
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

    it('timer stops when global stats overlay is open and starts when resumed', () => {
      cy.wait(1000);

      cy.get('[data-test="timer"]').then(($timerStart) => {
        const startNumber = $timerStart.text();

        cy.get('[data-test="global-stats-btn"]').click();

        cy.wait(2000);

        cy.get('[data-test="timer"]').then(($timerPaused) => {
          const pausedNumber = $timerPaused.text();

          cy.get('[data-test="game-overlay-btns"]').within(() => {
            cy.get('[data-test="close-stats-btn"]').click();
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

    it('timer stops when new game overlay is open and starts when resumed', () => {
      cy.wait(1000);

      cy.get('[data-test="timer"]').then(($timerStart) => {
        const startNumber = $timerStart.text();

        cy.get('[data-test="new-game-btn"]').click();

        cy.wait(2000);

        cy.get('[data-test="timer"]').then(($timerPaused) => {
          const pausedNumber = $timerPaused.text();

          cy.get('[data-test="new-game-overlay-continue-btn"]').click();

          cy.wait(2000);

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
      cy.wait(1000);

      cy.get('[data-test="new-game-btn"]').click();
      cy.get('[data-test="new-game-overlay-new-btn"]').click();

      cy.get('[data-test="timer"]').should('contain', '0:00:00');
    });

    it('it stops timer when game is lost and resets when new game is started', () => {
      cy.setBoard(noMovesKingColumn).then(() => {
        cy.wait(1000);

        cy.get('[data-test="card-K♣"]').clickTo('[data-test="column-1"]');
        cy.get('[data-test="card-Q♣"]').clickTo('[data-test="card-K♣"]');

        cy.get('[data-test="timer"]').then(($timerStart) => {
          const startNumber = $timerStart.text();

          cy.wait(2000);

          cy.get('[data-test="timer"]').then(($timerPaused) => {
            const pausedNumber = $timerPaused.text();

            expect(startNumber).to.equal(pausedNumber);
          });

          cy.get('[data-test="game-overlay-btns"]').within(() => {
            cy.get('[data-test="new-game-btn"]').click();
          });

          cy.get('[data-test="timer"]').should('contain', '0:00:00');
        });
      });
    });

    it('it stops timer when game is won and resets when new game is started', () => {
      cy.setBoard(foundations).then(() => {
        cy.wait(1000);

        cy.get('[data-test="card-Q♠"]').clickTo('[data-test="foundation-3"]');
        cy.get('[data-test="card-K♠"]').clickTo('[data-test="foundation-3"]');

        cy.get('[data-test="timer"]').then(($timerStart) => {
          const startNumber = $timerStart.text();

          cy.wait(2000);

          cy.get('[data-test="timer"]').then(($timerPaused) => {
            const pausedNumber = $timerPaused.text();

            expect(startNumber).to.equal(pausedNumber);
          });

          cy.get('[data-test="game-overlay-btns"]').within(() => {
            cy.get('[data-test="new-game-btn"]').click();
          });

          cy.get('[data-test="timer"]').should('contain', '0:00:00');
        });
      });
    });
  });
});
