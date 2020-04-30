import validMove from '../../fixtures/boards/validMove.json';

describe('Valid moves', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('using drag and drop', () => {
    // Test card from middle.
    it('should move 6d to 7d', () => {
      cy.setBoard(validMove).then(() => {
        cy.get('[data-test="column-3"]').shouldContain(['6d']);

        cy.get('[data-test="card-6d"]').dragTo('[data-test="card-7d"]');

        cy.get('[data-test="column-2"]').shouldContain(['6d']);
      });
    });

    // Test card from bottom.
    it('should move 9d to 10d', () => {
      cy.setBoard(validMove).then(() => {
        cy.get('[data-test="column-1"]').shouldContain(['9d']);

        cy.get('[data-test="card-9d"]').dragTo('[data-test="card-10d"]');

        cy.get('[data-test="column-6"]').shouldContain(['9d']);
      });
    });
  });

  describe('using clicks', () => {
    // Test card from middle.
    it('should move 6d to 7d', () => {
      cy.setBoard(validMove).then(() => {
        cy.get('[data-test="column-3"]').shouldContain(['6d']);

        cy.get('[data-test="card-6d"]').clickTo('[data-test="card-7d"]');

        cy.get('[data-test="column-2"]').shouldContain(['6d']);
      });
    });

    // Test card from bottom.
    it('should move 9d to 10d', () => {
      cy.setBoard(validMove).then(() => {
        cy.get('[data-test="column-1"]').shouldContain(['9d']);

        cy.get('[data-test="card-9d"]').clickTo('[data-test="card-10d"]');

        cy.get('[data-test="column-6"]').shouldContain(['9d']);
      });
    });
  });
});
