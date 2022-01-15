import fullGameDeck from '../../fixtures/decks/fullGame.json';

describe('Invalid moves', () => {
  beforeEach(() => {
    cy.visitApp();

    cy.setBoard(fullGameDeck);
  });

  afterEach(() => {
    cy.clearTest();
  });

  describe('using drag and drop', () => {
    it('should not move 9♥ to 4♣ (invalid value & suit)', () => {
      cy.dragCardFromTo('9♥', '4♣');

      cy.checkCardsNotExistOn(['9♥'], 'column-7');
    });

    it('should not move 2♠ to 4♣ (lower value and invalid suit)', () => {
      cy.dragCardFromTo('2♠', '4♣');

      cy.checkCardsNotExistOn(['2♠'], 'column-7');
    });

    it('should not move 6♥ to 4♣ (higher value and invalid suit)', () => {
      cy.dragCardFromTo('6♥', '4♣');

      cy.checkCardsNotExistOn(['6♥'], 'column-7');
    });

    it('should not move 3♦ to 4♣ (valid value and invalid suit)', () => {
      cy.dragCardFromTo('3♦', '4♣');

      cy.checkCardsNotExistOn(['3♦'], 'column-7');
    });

    it('should not move 8♣ to 4♣ (invalid value and valid suit)', () => {
      cy.dragCardFromTo('8♣', '4♣');

      cy.checkCardsNotExistOn(['8♣'], 'column-1');
    });
  });

  describe('using clicks', () => {
    it('should not move 9♥ to 4♣ (invalid value & suit)', () => {
      cy.clickFromTo('9♥', '4♣');

      cy.checkCardsNotExistOn(['9♥'], 'column-7');
    });

    it('should not move 2♠ to 4♣ (lower value and invalid suit)', () => {
      cy.clickFromTo('2♠', '4♣');

      cy.checkCardsNotExistOn(['2♠'], 'column-7');
    });

    it('should not move 6♥ to 4♣ (higher value and invalid suit)', () => {
      cy.clickFromTo('6♥', '4♣');

      cy.checkCardsNotExistOn(['6♥'], 'column-7');
    });

    it('should not move 3♦ to 4♣ (valid value and invalid suit)', () => {
      cy.clickFromTo('3♦', '4♣');

      cy.checkCardsNotExistOn(['3♦'], 'column-7');
    });

    it('should not move 8♣ to 4♣ (invalid value and valid suit)', () => {
      cy.clickFromTo('8♣', '4♣');

      cy.checkCardsNotExistOn(['8♣'], 'column-1');
    });
  });
});
