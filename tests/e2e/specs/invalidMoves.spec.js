import invalidMove from '../../fixtures/boards/invalidMove.json';

describe('Invalid moves', () => {
  beforeEach(() => {
    cy.visitApp();
  });

  afterEach(() => {
    cy.clearTest();
  });

  describe('using drag and drop', () => {
    // invalid value, invalid suit
    it('should not move 6♠ to 4♦', () => {
      cy.setBoard(invalidMove).then(() => {
        // Test card from middle.
        cy.get('[data-test="column-4"]').shouldContain(['6♠']);

        cy.dragFromTo('card-6♠', 'card-4♦');

        cy.get('[data-test="column-5"]').shouldNotContain(['6♠']);
      });
    });

    it('should not move 5♠ to 10♦', () => {
      cy.setBoard(invalidMove).then(() => {
        // Test card from bottom.
        cy.get('[data-test="column-0"]').shouldContain(['5♠']);

        cy.dragFromTo('card-5♠', 'card-10♦');

        cy.get('[data-test="column-6"]').shouldNotContain(['5♠']);
      });
    });

    // valid value, wrong suit
    it('should not move 4♦ to 5♠', () => {
      cy.setBoard(invalidMove).then(() => {
        cy.get('[data-test="column-5"]').shouldContain(['4♦']);

        cy.dragFromTo('card-4♦', 'card-5♠');

        cy.get('[data-test="column-0"]').shouldNotContain(['4♦']);
      });
    });

    // valid suit, wrong value
    it('should not move 7♦ to 9♦', () => {
      cy.setBoard(invalidMove).then(() => {
        cy.get('[data-test="column-2"]').shouldContain(['7♦']);

        cy.dragFromTo('card-7♦', 'card-9♦');

        cy.get('[data-test="column-1"]').shouldNotContain(['7♦']);
      });
    });
  });

  describe('using clicks', () => {
    // invalid value, invalid suit
    it('should not move 6♠ to 4♦', () => {
      cy.setBoard(invalidMove).then(() => {
        // Test card from middle.
        cy.get('[data-test="column-4"]').shouldContain(['6♠']);

        cy.get('[data-test="card-6♠"]').clickTo('[data-test="card-4♦"]');

        cy.get('[data-test="column-5"]').shouldNotContain(['6♠']);
      });
    });

    it('should not move 5♠ to 10♦', () => {
      cy.setBoard(invalidMove).then(() => {
        // Test card from bottom.
        cy.get('[data-test="column-0"]').shouldContain(['5♠']);

        cy.get('[data-test="card-5♠"]').clickTo('[data-test="card-10♦"]');

        cy.get('[data-test="column-6"]').shouldNotContain(['5♠']);
      });
    });

    // valid value, wrong suit
    it('should not move 4♦ to 5♠', () => {
      cy.setBoard(invalidMove).then(() => {
        cy.get('[data-test="column-5"]').shouldContain(['4♦']);

        cy.get('[data-test="card-4♦"]').clickTo('[data-test="card-5♠"]');

        cy.get('[data-test="column-0"]').shouldNotContain(['4♦']);
      });
    });

    // valid suit, wrong value
    it('should not move 7♦ to 9♦', () => {
      cy.setBoard(invalidMove).then(() => {
        cy.get('[data-test="column-2"]').shouldContain(['7♦']);

        cy.get('[data-test="card-7♦"]').clickTo('[data-test="card-9♦"]');

        cy.get('[data-test="column-1"]').shouldNotContain(['7♦']);
      });
    });

    // valid card, same column
    it('should not move Q♠ to K♠ on the same column', () => {
      cy.setBoard(invalidMove).then(() => {
        cy.get('[data-test="column-7"]').shouldContain(['Q♠']);

        cy.get('[data-test="card-Q♠"]').clickTo('[data-test="card-K♠"]');

        cy.get('[data-test="column-7"]')
          .children()
          .should('have.length', 6);
      });
    });
  });
});
