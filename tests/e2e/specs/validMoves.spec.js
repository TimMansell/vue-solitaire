import validMove from '../../fixtures/boards/validMove.json';

describe('Valid moves', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('using drag and drop', () => {
    // Test card from middle.
    it('should move 6♦ to 7♦', () => {
      cy.setBoard(validMove).then(() => {
        cy.get('[data-test="column-3"]').shouldContain(['6♦']);

        cy.get('[data-test="card-6♦"]').dragTo('[data-test="card-7♦"]');

        cy.get('[data-test="column-2"]').shouldContain(['6♦']);
      });
    });

    // Test card from bottom.
    it('should move 9♦ to 10♦', () => {
      cy.setBoard(validMove).then(() => {
        cy.get('[data-test="column-1"]').shouldContain(['9♦']);

        cy.get('[data-test="card-9♦"]').dragTo('[data-test="card-10♦"]');

        cy.get('[data-test="column-6"]').shouldContain(['9♦']);
      });
    });
  });

  describe('using clicks', () => {
    // Test card from middle.
    it('should move 6♦ to 7♦', () => {
      cy.setBoard(validMove).then(() => {
        cy.get('[data-test="column-3"]').shouldContain(['6♦']);

        cy.get('[data-test="card-6♦"]').clickTo('[data-test="card-7♦"]');

        cy.get('[data-test="column-2"]').shouldContain(['6♦']);
      });
    });

    // Test card from bottom.
    it('should move 9♦ to 10♦', () => {
      cy.setBoard(validMove).then(() => {
        cy.get('[data-test="column-1"]').shouldContain(['9♦']);

        cy.get('[data-test="card-9♦"]').clickTo('[data-test="card-10♦"]');

        cy.get('[data-test="column-6"]').shouldContain(['9♦']);
      });
    });
  });
});
