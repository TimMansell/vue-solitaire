import invalidMove from '../../fixtures/boards/invalidMove.json';

describe('Invalid moves', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('using drag and drop', () => {
    // invalid value, invalid suit
    it('should not move 6s to 4d and 5s to 10d', () => {
      cy.setBoard(invalidMove).then(() => {
        // Test card from middle.
        cy.get('[data-test="column-4"]').shouldContain(['6s']);

        cy.get('[data-test="card-6s"]').dragTo('[data-test="card-4d"]');

        cy.get('[data-test="column-5"]').shouldNotContain(['6s']);

        // Test card from bottom.
        cy.get('[data-test="column-0"]').shouldContain(['5s']);

        cy.get('[data-test="card-5s"]').dragTo('[data-test="card-10d"]');

        cy.get('[data-test="column-6"]').shouldNotContain(['5s']);
      });
    });

    // valid value, wrong suit
    it('should not move 4d to 5s', () => {
      cy.setBoard(invalidMove).then(() => {
        cy.get('[data-test="column-5"]').shouldContain(['4d']);

        cy.get('[data-test="card-4d"]').dragTo('[data-test="card-5s"]');

        cy.get('[data-test="column-0"]').shouldNotContain(['4d']);
      });
    });

    // valid suit, wrong value
    it('should not move 7d to 9d', () => {
      cy.setBoard(invalidMove).then(() => {
        cy.get('[data-test="column-2"]').shouldContain(['7d']);

        cy.get('[data-test="card-7d"]').dragTo('[data-test="card-9d"]');

        cy.get('[data-test="column-1"]').shouldNotContain(['7d']);
      });
    });
  });

  describe('using clicks', () => {
    // invalid value, invalid suit
    it('should not move 6s to 4d and 5s to 10d', () => {
      cy.setBoard(invalidMove).then(() => {
        // Test card from middle.
        cy.get('[data-test="column-4"]').shouldContain(['6s']);

        cy.get('[data-test="card-6s"]').clickTo('[data-test="card-4d"]');

        cy.get('[data-test="column-5"]').shouldNotContain(['6s']);

        // Test card from bottom.
        cy.get('[data-test="column-0"]').shouldContain(['5s']);

        cy.get('[data-test="card-5s"]').clickTo('[data-test="card-10d"]');

        cy.get('[data-test="column-6"]').shouldNotContain(['5s']);
      });
    });

    // valid value, wrong suit
    it('should not move 4d to 5s', () => {
      cy.setBoard(invalidMove).then(() => {
        cy.get('[data-test="column-5"]').shouldContain(['4d']);

        cy.get('[data-test="card-4d"]').clickTo('[data-test="card-5s"]');

        cy.get('[data-test="column-0"]').shouldNotContain(['4d']);
      });
    });

    // valid suit, wrong value
    it('should not move 7d to 9d', () => {
      cy.setBoard(invalidMove).then(() => {
        cy.get('[data-test="column-2"]').shouldContain(['7d']);

        cy.get('[data-test="card-7d"]').clickTo('[data-test="card-9d"]');

        cy.get('[data-test="column-1"]').shouldNotContain(['7d']);
      });
    });

    // valid card, same column
    it('should not move Qs to Ks on the same column', () => {
      cy.setBoard(invalidMove).then(() => {
        cy.get('[data-test="column-7"]').shouldContain(['Qs']);

        cy.get('[data-test="card-Qs"]').clickTo('[data-test="card-Ks"]');

        cy.get('[data-test="column-7"]')
          .children()
          .should('have.length', 6);
      });
    });
  });
});
