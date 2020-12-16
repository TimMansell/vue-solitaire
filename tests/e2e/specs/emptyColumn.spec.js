import emptyColumn from '../../fixtures/boards/emptyColumn.json';
import invalidMove from '../../fixtures/boards/invalidMove.json';

describe('Special column moves', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show empty column card placeholder', () => {
    cy.setBoard(emptyColumn).then(() => {
      cy.get('[data-test="column-0"]').within(() => {
        cy.get('[data-test="column-card-placeholder"]').should('be.visible');
      });
    });
  });

  describe('using drag and drop', () => {
    it('should move K♣ & 9♣ to an empty column', () => {
      cy.setBoard(emptyColumn).then(() => {
        cy.get('[data-test="column-7"]').shouldContain(['K♣', '9♣']);

        cy.get('[data-test="card-K♣"]').dragTo('[data-test="column-0"]');

        cy.get('[data-test="column-0"]').shouldContain(['K♣', '9♣']);

        cy.get('[data-test="column-7"]').shouldNotContain(['K♣', '9♣']);
      });
    });

    it('should move K♥ to 5♠ to an empty column', () => {
      cy.setBoard(emptyColumn).then(() => {
        cy.get('[data-test="column-1"]').shouldContain(['K♥']);

        cy.get('[data-test="card-K♥"]').dragTo('[data-test="column-0"]');

        cy.get('[data-test="column-0"]').shouldContain(['K♥', '9♦', '5♠']);

        cy.get('[data-test="column-1"]').shouldNotContain(['K♥', '9♦', '5♠']);

        cy.get('[data-test="column-1"]').shouldContain(['A♠']);
      });
    });

    // K to not empty
    it('should not move K♠ to 9♦', () => {
      cy.setBoard(invalidMove).then(() => {
        cy.get('[data-test="column-7"]').shouldContain(['K♠']);

        cy.get('[data-test="card-K♠"]').dragTo('[data-test="card-9♦"]');

        cy.get('[data-test="column-1"]').shouldNotContain(['K♠']);
      });
    });

    it('should not move Q♥ to empty column', () => {
      cy.setBoard(emptyColumn).then(() => {
        cy.get('[data-test="column-2"]').shouldContain(['Q♥']);

        cy.get('[data-test="card-Q♥"]').dragTo('[data-test="column-0"]');

        cy.get('[data-test="column-0"]').shouldNotContain(['Q♥']);

        cy.get('[data-test="column-2"]').shouldContain(['Q♥']);
      });
    });

    it('should not move J♦ to empty column', () => {
      cy.setBoard(emptyColumn).then(() => {
        cy.get('[data-test="column-3"]').shouldContain(['J♦']);

        cy.get('[data-test="card-J♦"]').dragTo('[data-test="column-0"]');

        cy.get('[data-test="column-0"]').shouldNotContain(['J♦']);

        cy.get('[data-test="column-3"]').shouldContain(['J♦']);
      });
    });
  });

  describe('using clicks', () => {
    it('should move K♣ & 9♣ to an empty column', () => {
      cy.setBoard(emptyColumn).then(() => {
        cy.get('[data-test="column-7"]').shouldContain(['K♣', '9♣']);

        cy.get('[data-test="card-K♣"]').clickTo('[data-test="column-0"]');

        cy.get('[data-test="column-0"]').shouldContain(['K♣', '9♣']);

        cy.get('[data-test="column-7"]').shouldNotContain(['K♣', '9♣']);
      });
    });

    it('should move K♥ to 5♠ to an empty column', () => {
      cy.setBoard(emptyColumn).then(() => {
        cy.get('[data-test="column-1"]').shouldContain(['K♥']);

        cy.get('[data-test="card-K♥"]').clickTo('[data-test="column-0"]');

        cy.get('[data-test="column-0"]').shouldContain(['K♥', '9♦', '5♠']);

        cy.get('[data-test="column-1"]').shouldNotContain(['K♥', '9♦', '5♠']);

        cy.get('[data-test="column-1"]').shouldContain(['A♠']);
      });
    });

    // K to not empty
    it('should not move K♠ to 9♦', () => {
      cy.setBoard(invalidMove).then(() => {
        cy.get('[data-test="column-7"]').shouldContain(['K♠']);

        cy.get('[data-test="card-K♠"]').clickTo('[data-test="card-9♦"]');

        cy.get('[data-test="column-1"]').shouldNotContain(['K♠']);
      });
    });

    it('should not move Q♥ to empty column', () => {
      cy.setBoard(emptyColumn).then(() => {
        cy.get('[data-test="column-2"]').shouldContain(['Q♥']);

        cy.get('[data-test="card-Q♥"]').clickTo('[data-test="column-0"]');

        cy.get('[data-test="column-0"]').shouldNotContain(['Q♥']);

        cy.get('[data-test="column-2"]').shouldContain(['Q♥']);
      });
    });

    it('should not move J♦ to empty column', () => {
      cy.setBoard(emptyColumn).then(() => {
        cy.get('[data-test="column-3"]').shouldContain(['J♦']);

        cy.get('[data-test="card-J♦"]').clickTo('[data-test="column-0"]');

        cy.get('[data-test="column-0"]').shouldNotContain(['J♦']);

        cy.get('[data-test="column-3"]').shouldContain(['J♦']);
      });
    });
  });
});
