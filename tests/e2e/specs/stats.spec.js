import foundations from '../../fixtures/boards/fullFoundation.json';
import noMovesKingColumn from '../../fixtures/boards/noMovesKingColumn.json';

describe('Stats', () => {
  describe('User Stats', () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.visit('/');
    });

    it('it successfully retrieves games played', () => {
      const number = 0;

      cy.get('[data-test="stats"]').then(() => {
        cy.get('[data-test="stats"]').should('not.equal', number);
      });
    });

    it('it stores ids in local storage', () => {
      const luid = localStorage.getItem('luid');
      const suid = localStorage.getItem('suid');

      expect(luid).to.not.equal('');
      expect(suid).to.not.equal('');
    });

    it('it successfully increments games played', () => {
      cy.get('[data-test="stats"]').then(($stats) => {
        const number = $stats.text();

        cy.get('[data-test="new-game-btn"]').click();

        cy.get('[data-test="stats"]').should('not.equal', number);
      });
    });

    it('it successfully increments games played after lost game', () => {
      cy.setBoard(noMovesKingColumn).then(() => {
        cy.get('[data-test="card-Q♣"]').clickTo('[data-test="card-K♣"]');
        cy.get('[data-test="card-K♣"]').clickTo('[data-test="column-1"]');

        cy.get('[data-test="stats"]').then(($stats) => {
          const number = $stats.text();

          cy.get('[data-test="game-overlay-btns"]').click();

          cy.get('[data-test="stats"]').should('not.equal', number);
        });
      });
    });

    it('it successfully increments games played after won game', () => {
      cy.setBoard(foundations).then(() => {
        cy.get('[data-test="card-Q♠"]').clickTo('[data-test="foundation-3"]');
        cy.get('[data-test="card-K♠"]').clickTo('[data-test="foundation-3"]');

        cy.get('[data-test="stats"]').then(($stats) => {
          const number = $stats.text();

          cy.get('[data-test="game-overlay-btns"]').click();

          cy.get('[data-test="stats"]').should('not.equal', number);
        });
      });
    });

    it('should show user stats overlay and then close overlay', () => {
      cy.get('[data-test="user-stats-btn"]').click();

      cy.get('[data-test="stats-overlay"]')
        .should('be.visible')
        .within(() => {
          cy.get('[data-test="close-stats-btn"]').click();
        });

      cy.get('[data-test="stats-overlay"]').should('not.be.visible');
    });

    it('should show user stats overlay on page refresh', () => {
      cy.get('[data-test="user-stats-btn"]').click();

      cy.reload();

      cy.get('[data-test="stats-overlay"]').should('be.visible');
    });

    it('should not show game paused if user stats overlay is visible', () => {
      cy.document().then((doc) => {
        cy.stub(doc, 'visibilityState').value('hidden');
      });

      cy.get('[data-test="user-stats-btn"]').click();

      cy.document().trigger('visibilitychange');

      cy.get('[data-test="game-paused"]').should('not.be.visible');
    });
  });

  describe('Global Stats', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('it successfully retrieves games played', () => {
      const number = 0;

      cy.get('[data-test="global-stats"]').then(() => {
        cy.get('[data-test="global-stats"]').should('not.equal', number);
      });
    });

    it('it successfully retrieves player count', () => {
      const number = 0;

      cy.get('[data-test="player-count"]').then(() => {
        cy.get('[data-test="player-count"]').should('not.equal', number);
      });
    });

    it('it successfully increments games played', () => {
      cy.get('[data-test="global-stats"]').then(($stats) => {
        const number = $stats.text();

        cy.get('[data-test="new-game-btn"]').click();

        cy.get('[data-test="game-overlay-btns"]').within(() => {
          cy.get('[data-test="new-game-btn"]').click();
        });

        cy.get('[data-test="global-stats"]').should('not.equal', number);
      });
    });

    it('it successfully increments games played after lost game', () => {
      cy.setBoard(noMovesKingColumn).then(() => {
        cy.get('[data-test="card-Q♣"]').clickTo('[data-test="card-K♣"]');
        cy.get('[data-test="card-K♣"]').clickTo('[data-test="column-1"]');

        cy.get('[data-test="global-stats"]').then(($stats) => {
          const number = $stats.text();

          cy.get('[data-test="game-overlay-btns"]').click();

          cy.get('[data-test="global-stats"]').should('not.equal', number);
        });
      });
    });

    it('it successfully increments games played after won game', () => {
      cy.setBoard(foundations).then(() => {
        cy.get('[data-test="card-Q♠"]').clickTo('[data-test="foundation-3"]');
        cy.get('[data-test="card-K♠"]').clickTo('[data-test="foundation-3"]');

        cy.get('[data-test="global-stats"]').then(($stats) => {
          const number = $stats.text();

          cy.get('[data-test="game-overlay-btns"]').click();

          cy.get('[data-test="global-stats"]').should('not.equal', number);
        });
      });
    });

    it('should show global stats overlay and then close overlay', () => {
      cy.get('[data-test="global-stats-btn"]').click();

      cy.get('[data-test="stats-overlay"]')
        .should('be.visible')
        .within(() => {
          cy.get('[data-test="close-stats-btn"]').click();
        });

      cy.get('[data-test="stats-overlay"]').should('not.be.visible');
    });

    it('should show global stats overlay on page refresh', () => {
      cy.get('[data-test="global-stats-btn"]').click();

      cy.reload();

      cy.get('[data-test="stats-overlay"]').should('be.visible');
    });

    it('should not show game paused if global stats overlay is visible', () => {
      cy.document().then((doc) => {
        cy.stub(doc, 'visibilityState').value('hidden');
      });

      cy.get('[data-test="global-stats-btn"]').click({ force: true });

      cy.document().trigger('visibilitychange');

      cy.get('[data-test="game-paused"]').should('not.be.visible');
    });
  });
});
