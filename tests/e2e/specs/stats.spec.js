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

    it('it stores user stats in local storage', () => {
      const userStats = localStorage.getItem('userStats');

      expect(userStats).to.not.equal('');
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
        cy.get('[data-test="card-Qc"]').clickTo('[data-test="card-Kc"]');
        cy.get('[data-test="card-Kc"]').clickTo('[data-test="column-1"]');

        cy.get('[data-test="stats"]').then(($stats) => {
          const number = $stats.text();

          cy.get('[data-test="game-overlay-btn"]').click();

          cy.get('[data-test="stats"]').should('not.equal', number);
        });
      });
    });

    it('it successfully increments games played after won game', () => {
      cy.setBoard(foundations).then(() => {
        cy.get('[data-test="card-Qs"]').clickTo('[data-test="foundation-3"]');
        cy.get('[data-test="card-Ks"]').clickTo('[data-test="foundation-3"]');

        cy.get('[data-test="stats"]').then(($stats) => {
          const number = $stats.text();

          cy.get('[data-test="game-overlay-btn"]').click();

          cy.get('[data-test="stats"]').should('not.equal', number);
        });
      });
    });
  });

  describe('Global Stats', () => {
    beforeEach(() => {
      // cy.clearLocalStorage();
      cy.visit('/');
    });

    it('it successfully retrieves games played', () => {
      const number = 0;

      cy.get('[data-test="stats"]').then(() => {
        cy.get('[data-test="stats"]').should('not.equal', number);
      });
    });

    it('it successfully increments games played', () => {
      cy.get('[data-test="global-stats"]').then(($stats) => {
        const number = $stats.text();

        cy.get('[data-test="new-game-btn"]').click();

        cy.get('[data-test="global-stats"]').should('not.equal', number);
      });
    });

    it('it successfully increments games played after lost game', () => {
      cy.setBoard(noMovesKingColumn).then(() => {
        cy.get('[data-test="card-Qc"]').clickTo('[data-test="card-Kc"]');
        cy.get('[data-test="card-Kc"]').clickTo('[data-test="column-1"]');

        cy.get('[data-test="global-stats"]').then(($stats) => {
          const number = $stats.text();

          cy.get('[data-test="game-overlay-btn"]').click();

          cy.get('[data-test="global-stats"]').should('not.equal', number);
        });
      });
    });

    it('it successfully increments games played after won game', () => {
      cy.setBoard(foundations).then(() => {
        cy.get('[data-test="card-Qs"]').clickTo('[data-test="foundation-3"]');
        cy.get('[data-test="card-Ks"]').clickTo('[data-test="foundation-3"]');

        cy.get('[data-test="global-stats"]').then(($stats) => {
          const number = $stats.text();

          cy.get('[data-test="game-overlay-btn"]').click();

          cy.get('[data-test="global-stats"]').should('not.equal', number);
        });
      });
    });
  });
});
