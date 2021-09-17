import emptyColumnDeck from '../../fixtures/decks/emptyColumn.json';
import emptyColumnMoves from '../../fixtures/moves/emptyColumn.json';

describe('Special column moves', () => {
  beforeEach(() => {
    cy.mockApi({
      mockDeck: emptyColumnDeck,
      mockInitial: true,
    });

    cy.visitApp();

    cy.runGameWithClicks(emptyColumnMoves);
  });

  afterEach(() => {
    cy.clearTest();
  });

  it('should show empty column card placeholder', () => {
    cy.get('[data-test="column-1"]').within(() => {
      cy.get('[data-test="column-card-placeholder"]').should('be.visible');
    });
  });

  describe('using drag and drop', () => {
    it('should move K♣ to an empty column', () => {
      cy.dragFromTo('K♣', 'column-1');

      cy.get('[data-test="column-1"]').shouldContain(['K♣', 'K♦', 'Q♦', 'J♣']);

      cy.get('[data-test="column-7"]').shouldNotContain(['K♣']);
    });

    it('should not move Q♣ to empty column', () => {
      cy.dragFromTo('Q♣', 'column-0');

      cy.get('[data-test="column-1"]').shouldNotContain(['Q♣']);

      cy.get('[data-test="column-0"]').shouldContain(['Q♣']);
    });

    it('should not move J♠ to empty column', () => {
      cy.dragFromTo('J♠', 'column-0');

      cy.get('[data-test="column-0"]').shouldNotContain(['J♠']);

      cy.get('[data-test="column-4"]').shouldContain(['J♠']);
    });
  });

  describe('using clicks', () => {
    it('should move K♣ to an empty column', () => {
      cy.clickFromTo('K♣', 'column-1');

      cy.get('[data-test="column-1"]').shouldContain(['K♣', 'K♦', 'Q♦', 'J♣']);

      cy.get('[data-test="column-7"]').shouldNotContain(['K♣']);
    });

    it('should not move Q♣ to empty column', () => {
      cy.clickFromTo('Q♣', 'column-1');

      cy.get('[data-test="column-1"]').shouldNotContain(['Q♣']);

      cy.get('[data-test="column-0"]').shouldContain(['Q♣']);
    });

    it('should not move J♠ to empty column', () => {
      cy.clickFromTo('J♠', 'column-0');

      cy.get('[data-test="column-0"]').shouldNotContain(['J♠']);

      cy.get('[data-test="column-4"]').shouldContain(['J♠']);
    });
  });
});
