import validMoveDeck from '../../fixtures/decks/validMove.json';

describe('Valid moves', () => {
  beforeEach(() => {
    cy.visitApp({ mockDeck: validMoveDeck });
  });

  afterEach(() => {
    cy.clearTest();
  });

  describe('using drag and drop', () => {
    it('should move 6♦ in middle of column to 7♦', () => {
      cy.dragFromTo('card-6♦', 'card-7♦');

      cy.get('[data-test="column-2"]').shouldContain(['6♦']);

      cy.get('[data-test="moves"]')
        .text()
        .should('equal', '1');
    });

    it('should move 9♦ at bottom of column to 10♦', () => {
      cy.dragFromTo('card-9♦', 'card-10♦');

      cy.get('[data-test="column-6"]').shouldContain(['9♦']);

      cy.get('[data-test="moves"]')
        .text()
        .should('equal', '1');
    });

    it('should move A♣ to 2♣', () => {
      cy.dragFromTo('card-A♣', 'card-2♣');

      cy.get('[data-test="column-0"]').shouldContain(['A♣']);

      cy.get('[data-test="moves"]')
        .text()
        .should('equal', '1');
    });
  });

  describe('using clicks', () => {
    it('should move 6♦ in middle of column to 7♦', () => {
      cy.get('[data-test="card-6♦"]').clickTo('[data-test="card-7♦"]');

      cy.get('[data-test="column-2"]').shouldContain(['6♦']);

      cy.get('[data-test="moves"]')
        .text()
        .should('equal', '1');
    });

    it('should move 9♦ at bottom of column to 10♦', () => {
      cy.get('[data-test="card-9♦"]').clickTo('[data-test="card-10♦"]');

      cy.get('[data-test="column-6"]').shouldContain(['9♦']);

      cy.get('[data-test="moves"]')
        .text()
        .should('equal', '1');
    });

    it('should move A♣ to 2♣', () => {
      cy.get('[data-test="card-A♣"]').clickTo('[data-test="card-2♣"]');

      cy.get('[data-test="column-0"]').shouldContain(['A♣']);

      cy.get('[data-test="moves"]')
        .text()
        .should('equal', '1');
    });
  });
});
