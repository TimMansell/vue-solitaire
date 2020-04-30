import emptyColumn from '../../fixtures/boards/emptyColumn.json';
import invalidMove from '../../fixtures/boards/invalidMove.json';

describe('Special column moves', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show empty column card placeholder', () => {
    cy.setBoard(emptyColumn).then(() => {
      cy.get('[data-test="column-0"]').within(() => {
        cy.get('[data-test="card-placeholder"]').should('be.visible');
      });
    });
  });

  describe('using drag and drop', () => {
    it('should move Kc & 9c to an empty column', () => {
      cy.setBoard(emptyColumn).then(() => {
        cy.get('[data-test="column-7"]').shouldContain(['Kc', '9c']);

        cy.get('[data-test="card-Kc"]').dragTo('[data-test="column-0"]');

        cy.get('[data-test="column-0"]').shouldContain(['Kc', '9c']);

        cy.get('[data-test="column-7"]').shouldNotContain(['Kc', '9c']);
      });
    });

    it('should move Kh to 5s to an empty column', () => {
      cy.setBoard(emptyColumn).then(() => {
        cy.get('[data-test="column-1"]').shouldContain(['Kh']);

        cy.get('[data-test="card-Kh"]').dragTo('[data-test="column-0"]');

        cy.get('[data-test="column-0"]').shouldContain(['Kh', '9d', '5s']);

        cy.get('[data-test="column-1"]').shouldNotContain(['Kh', '9d', '5s']);

        cy.get('[data-test="column-1"]').shouldContain(['As']);
      });
    });

    // K to not empty
    it('should not move Ks to 9d', () => {
      cy.setBoard(invalidMove).then(() => {
        cy.get('[data-test="column-7"]').shouldContain(['Ks']);

        cy.get('[data-test="card-Ks"]').dragTo('[data-test="card-9d"]');

        cy.get('[data-test="column-1"]').shouldNotContain(['Ks']);
      });
    });

    it('should not move Qh to empty column', () => {
      cy.setBoard(emptyColumn).then(() => {
        cy.get('[data-test="column-2"]').shouldContain(['Qh']);

        cy.get('[data-test="card-Qh"]').dragTo('[data-test="column-0"]');

        cy.get('[data-test="column-0"]').shouldNotContain(['Qh']);

        cy.get('[data-test="column-2"]').shouldContain(['Qh']);
      });
    });

    it('should not move Jd to empty column', () => {
      cy.setBoard(emptyColumn).then(() => {
        cy.get('[data-test="column-3"]').shouldContain(['Jd']);

        cy.get('[data-test="card-Jd"]').dragTo('[data-test="column-0"]');

        cy.get('[data-test="column-0"]').shouldNotContain(['Jd']);

        cy.get('[data-test="column-3"]').shouldContain(['Jd']);
      });
    });
  });

  describe('using clicks', () => {
    it('should move Kc & 9c to an empty column', () => {
      cy.setBoard(emptyColumn).then(() => {
        cy.get('[data-test="column-7"]').shouldContain(['Kc', '9c']);

        cy.get('[data-test="card-Kc"]').clickTo('[data-test="column-0"]');

        cy.get('[data-test="column-0"]').shouldContain(['Kc', '9c']);

        cy.get('[data-test="column-7"]').shouldNotContain(['Kc', '9c']);
      });
    });

    it('should move Kh to 5s to an empty column', () => {
      cy.setBoard(emptyColumn).then(() => {
        cy.get('[data-test="column-1"]').shouldContain(['Kh']);

        cy.get('[data-test="card-Kh"]').clickTo('[data-test="column-0"]');

        cy.get('[data-test="column-0"]').shouldContain(['Kh', '9d', '5s']);

        cy.get('[data-test="column-1"]').shouldNotContain(['Kh', '9d', '5s']);

        cy.get('[data-test="column-1"]').shouldContain(['As']);
      });
    });

    // K to not empty
    it('should not move Ks to 9d', () => {
      cy.setBoard(invalidMove).then(() => {
        cy.get('[data-test="column-7"]').shouldContain(['Ks']);

        cy.get('[data-test="card-Ks"]').clickTo('[data-test="card-9d"]');

        cy.get('[data-test="column-1"]').shouldNotContain(['Ks']);
      });
    });

    it('should not move Qh to empty column', () => {
      cy.setBoard(emptyColumn).then(() => {
        cy.get('[data-test="column-2"]').shouldContain(['Qh']);

        cy.get('[data-test="card-Qh"]').clickTo('[data-test="column-0"]');

        cy.get('[data-test="column-0"]').shouldNotContain(['Qh']);

        cy.get('[data-test="column-2"]').shouldContain(['Qh']);
      });
    });

    it('should not move Jd to empty column', () => {
      cy.setBoard(emptyColumn).then(() => {
        cy.get('[data-test="column-3"]').shouldContain(['Jd']);

        cy.get('[data-test="card-Jd"]').clickTo('[data-test="column-0"]');

        cy.get('[data-test="column-0"]').shouldNotContain(['Jd']);

        cy.get('[data-test="column-3"]').shouldContain(['Jd']);
      });
    });
  });
});
