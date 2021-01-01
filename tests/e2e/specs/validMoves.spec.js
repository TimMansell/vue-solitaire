import validMove from '../../fixtures/boards/validMove.json';

describe('Valid moves', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('using drag and drop', () => {
    it('should move 6♦ in middle of column to 7♦', () => {
      cy.setBoard(validMove).then(() => {
        cy.get('[data-test="column-3"]').shouldContain(['6♦']);

        cy.get('[data-test="card-6♦"]').dragTo('[data-test="card-7♦"]');

        cy.get('[data-test="column-2"]').shouldContain(['6♦']);
      });
    });

    it('should move 9♦ at bottom of column to 10♦', () => {
      cy.setBoard(validMove).then(() => {
        cy.get('[data-test="column-1"]').shouldContain(['9♦']);

        cy.get('[data-test="card-9♦"]').dragTo('[data-test="card-10♦"]');

        cy.get('[data-test="column-6"]').shouldContain(['9♦']);
      });
    });

    it('should move A♣ to 2♣', () => {
      cy.setBoard(validMove).then(() => {
        cy.get('[data-test="column-4"]').shouldContain(['A♣']);

        cy.get('[data-test="card-A♣"]').dragTo('[data-test="card-2♣"]');

        cy.get('[data-test="column-0"]').shouldContain(['A♣']);
      });
    });
  });

  describe('using clicks', () => {
    it('should move 6♦ in middle of column to 7♦', () => {
      cy.setBoard(validMove).then(() => {
        cy.get('[data-test="column-3"]').shouldContain(['6♦']);

        cy.get('[data-test="card-6♦"]').clickTo('[data-test="card-7♦"]');

        cy.get('[data-test="column-2"]').shouldContain(['6♦']);
      });
    });

    it('should move 9♦ at bottom of column to 10♦', () => {
      cy.setBoard(validMove).then(() => {
        cy.get('[data-test="column-1"]').shouldContain(['9♦']);

        cy.get('[data-test="card-9♦"]').clickTo('[data-test="card-10♦"]');

        cy.get('[data-test="column-6"]').shouldContain(['9♦']);
      });
    });

    it('should move A♣ to 2♣', () => {
      cy.setBoard(validMove).then(() => {
        cy.get('[data-test="column-4"]').shouldContain(['A♣']);

        cy.get('[data-test="card-A♣"]').clickTo('[data-test="card-2♣"]');

        cy.get('[data-test="column-0"]').shouldContain(['A♣']);
      });
    });
  });
});
