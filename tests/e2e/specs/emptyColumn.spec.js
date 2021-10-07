import emptyColumnDeck from '../../fixtures/decks/emptyColumn.json';
import emptyColumnMoves from '../../fixtures/moves/emptyColumn.json';

describe('Special column moves', () => {
  beforeEach(() => {
    cy.setDeck(emptyColumnDeck).then(() => {
      cy.visitApp();
    });

    cy.runGameWithClicks(emptyColumnMoves);

    cy.checkPlaceholderCardAtColumn(1);
  });

  afterEach(() => {
    cy.clearTest();
  });

  describe('using drag and drop', () => {
    it('should move K♣ to an empty column', () => {
      cy.dragCardFromTo('K♣', 'column-1');

      cy.checkCardsExistOn(['K♣', 'K♦', 'Q♦', 'J♣'], 'column-1');
      cy.checkCardsNotExistOn(['K♣'], 'column-7');
    });

    it('should not move Q♣ to empty column', () => {
      cy.dragCardFromTo('Q♣', 'column-0');

      cy.checkCardsNotExistOn(['Q♣'], 'column-1');
      cy.checkCardsExistOn(['Q♣'], 'column-0');
    });

    it('should not move J♠ to empty column', () => {
      cy.dragCardFromTo('J♠', 'column-0');

      cy.checkCardsNotExistOn(['J♠'], 'column-0');
      cy.checkCardsExistOn(['J♠'], 'column-4');
    });
  });

  describe('using clicks', () => {
    it('should move K♣ to an empty column', () => {
      cy.clickFromTo('K♣', 'column-1');

      cy.checkCardsExistOn(['K♣', 'K♦', 'Q♦', 'J♣'], 'column-1');
      cy.checkCardsNotExistOn(['K♣'], 'column-7');
    });

    it('should not move Q♣ to empty column', () => {
      cy.clickFromTo('Q♣', 'column-1');

      cy.checkCardsNotExistOn(['Q♣'], 'column-1');
      cy.checkCardsExistOn(['Q♣'], 'column-0');
    });

    it('should not move J♠ to empty column', () => {
      cy.clickFromTo('J♠', 'column-0');

      cy.checkCardsNotExistOn(['J♠'], 'column-0');
      cy.checkCardsExistOn(['J♠'], 'column-4');
    });
  });
});
