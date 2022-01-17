import validMoveDeck from '../../fixtures/decks/validMove.json';

describe('Valid moves', () => {
  beforeEach(() => {
    cy.visitApp();

    cy.setBoard(validMoveDeck);
  });

  afterEach(() => {
    cy.clearTest();
  });

  describe('using drag and drop', () => {
    it('should move 6♦ in middle of column to 7♦', () => {
      cy.dragCardFromTo('6♦', '7♦');

      cy.checkCardsExistOn(['6♦'], 'column-2');

      cy.checkMoveCount(1);
    });

    it('should move 9♦ at bottom of column to 10♦', () => {
      cy.dragCardFromTo('9♦', '10♦');

      cy.checkCardsExistOn(['9♦'], 'column-6');

      cy.checkMoveCount(1);
    });

    it('should move A♣ to 2♣', () => {
      cy.dragCardFromTo('A♣', '2♣');

      cy.checkCardsExistOn(['A♣'], 'column-0');

      cy.checkMoveCount(1);
    });
  });

  describe('using clicks', () => {
    it('should move 6♦ in middle of column to 7♦', () => {
      cy.clickFromTo('6♦', '7♦');

      cy.checkCardsExistOn(['6♦'], 'column-2');

      cy.checkMoveCount(1);
    });

    it('should move 9♦ at bottom of column to 10♦', () => {
      cy.clickFromTo('9♦', '10♦');

      cy.checkCardsExistOn(['9♦'], 'column-6');

      cy.checkMoveCount(1);
    });

    it('should move A♣ to 2♣', () => {
      cy.clickFromTo('A♣', '2♣');

      cy.checkCardsExistOn(['A♣'], 'column-0');

      cy.checkMoveCount(1);
    });
  });
});
