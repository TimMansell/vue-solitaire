import AcesDeck from '../../fixtures/decks/acesToFoundation.json';

describe('Foundation moves', () => {
  beforeEach(() => {
    cy.visitApp();

    cy.setBoard(AcesDeck);
  });

  afterEach(() => {
    cy.clearTest();
  });

  describe('using drag and drop', () => {
    it('should move A♠ to 1st foundation', () => {
      cy.dragCardFromTo('A♠', 'foundation-0');

      cy.checkCardsExistOn(['A♠'], 'foundation-0');
      cy.checkCardsNotExistOn(['A♠'], 'column-7');
    });

    it('should move A♠ to 2nd foundation', () => {
      cy.dragCardFromTo('A♠', 'foundation-1');

      cy.checkCardsExistOn(['A♠'], 'foundation-1');
      cy.checkCardsNotExistOn(['A♠'], 'column-7');
    });

    it('should move A♠ to 3rd foundation', () => {
      cy.dragCardFromTo('A♠', 'foundation-2');

      cy.checkCardsExistOn(['A♠'], 'foundation-2');
      cy.checkCardsNotExistOn(['A♠'], 'column-7');
    });

    it('should move A♠ to 4th foundation', () => {
      cy.dragCardFromTo('A♠', 'foundation-3');

      cy.checkCardsExistOn(['A♠'], 'foundation-3');
      cy.checkCardsNotExistOn(['A♠'], 'column-7');
    });

    it('should move A♥, 2♥, 3♥ to 1st foundation', () => {
      cy.dragCardFromTo('A♥', 'foundation-0');
      cy.dragCardFromTo('2♥', 'foundation-0');
      cy.dragCardFromTo('3♥', 'foundation-0');

      cy.checkCardsExistOn(['A♥', '2♥', '3♥'], 'foundation-0');
      cy.checkCardsNotExistOn(['A♥', '2♥', '3♥'], 'column-3');
    });

    it('should move A♥ then 2♥ and A♠ then 2♠ to 2nd & 4th foundation', () => {
      cy.dragCardFromTo('A♥', 'foundation-1');
      cy.dragCardFromTo('2♥', 'foundation-1');

      cy.checkCardsExistOn(['A♥', '2♥'], 'foundation-1');
      cy.checkCardsNotExistOn(['A♥', '2♥'], 'column-3');

      cy.dragCardFromTo('A♠', 'foundation-3');
      cy.dragCardFromTo('2♠', 'foundation-3');

      cy.checkCardsExistOn(['A♠', '2♠'], 'foundation-3');
      cy.checkCardsNotExistOn(['A♠', '2♠'], 'column-7');
    });

    it('should move A♥ then 2♥ to 2nd foundation and not move A♠ to same foundation', () => {
      cy.dragCardFromTo('A♥', 'foundation-1');
      cy.dragCardFromTo('2♥', 'foundation-1');

      cy.checkCardsExistOn(['A♥', '2♥'], 'foundation-1');
      cy.checkCardsNotExistOn(['A♥', '2♥'], 'column-3');

      cy.dragCardFromTo('A♠', 'foundation-1');

      cy.checkCardsNotExistOn(['A♠'], 'foundation-1');
      cy.checkCardsExistOn(['A♠'], 'column-7');
    });

    it('should move A♦ to 1st foundation and not 2♦', () => {
      cy.dragCardFromTo('A♦', 'foundation-0');
      cy.dragCardFromTo('2♦', 'foundation-0');

      cy.checkCardsExistOn(['A♦'], 'foundation-0');
      cy.checkCardsNotExistOn(['2♦'], 'foundation-0');
      cy.checkCardsExistOn(['2♦'], 'column-6');
    });

    it('should move A♥ to 1st foundation and not move 2♣', () => {
      cy.dragCardFromTo('A♥', 'foundation-0');
      cy.dragCardFromTo('2♣', 'foundation-0');

      cy.checkCardsExistOn(['A♥'], 'foundation-0');
      cy.checkCardsNotExistOn(['2♣'], 'foundation-0');
      cy.checkCardsNotExistOn(['A♥'], 'column-3');
    });

    it('should not move A♣ to foundation', () => {
      cy.dragCardFromTo('A♣', 'foundation-0');

      cy.checkCardsExistOn(['A♣'], 'column-4');
      cy.checkCardsNotExistOn(['A♣'], 'foundation-0');
    });
  });

  describe('using clicks', () => {
    it('should move A♠ to 1st foundation', () => {
      cy.clickFromTo('A♠', 'foundation-0');

      cy.checkCardsExistOn(['A♠'], 'foundation-0');
      cy.checkCardsNotExistOn(['A♠'], 'column-7');
    });

    it('should move A♠ to 2nd foundation', () => {
      cy.clickFromTo('A♠', 'foundation-1');

      cy.checkCardsExistOn(['A♠'], 'foundation-1');
      cy.checkCardsNotExistOn(['A♠'], 'column-7');
    });

    it('should move A♠ to 3rd foundation', () => {
      cy.clickFromTo('A♠', 'foundation-2');

      cy.checkCardsExistOn(['A♠'], 'foundation-2');
      cy.checkCardsNotExistOn(['A♠'], 'column-7');
    });

    it('should move A♠ to 4th foundation', () => {
      cy.clickFromTo('A♠', 'foundation-3');

      cy.checkCardsExistOn(['A♠'], 'foundation-3');
      cy.checkCardsNotExistOn(['A♠'], 'column-7');
    });

    it('should move A♥, 2♥, 3♥ to 1st foundation', () => {
      cy.clickFromTo('A♥', 'foundation-0');
      cy.clickFromTo('2♥', 'foundation-0');
      cy.clickFromTo('3♥', 'foundation-0');

      cy.checkCardsExistOn(['A♥', '2♥', '3♥'], 'foundation-0');
      cy.checkCardsNotExistOn(['A♥', '2♥', '3♥'], 'column-3');
    });

    it('should move A♥ then 2♥ and A♠ then 2♠ to 2nd & 4th foundation', () => {
      cy.clickFromTo('A♥', 'foundation-1');
      cy.clickFromTo('2♥', 'foundation-1');

      cy.checkCardsExistOn(['A♥', '2♥'], 'foundation-1');
      cy.checkCardsNotExistOn(['A♥', '2♥'], 'column-3');

      cy.clickFromTo('A♠', 'foundation-3');
      cy.clickFromTo('2♠', 'foundation-3');

      cy.checkCardsExistOn(['A♠', '2♠'], 'foundation-3');
      cy.checkCardsNotExistOn(['A♠', '2♠'], 'column-7');
    });

    it('should move A♥ then 2♥ to 2nd foundation and not move A♠ to same foundation', () => {
      cy.clickFromTo('A♥', 'foundation-1');
      cy.clickFromTo('2♥', 'foundation-1');

      cy.checkCardsExistOn(['A♥', '2♥'], 'foundation-1');
      cy.checkCardsNotExistOn(['A♥', '2♥'], 'column-3');

      cy.clickFromTo('A♠', 'foundation-1');

      cy.checkCardsNotExistOn(['A♠'], 'foundation-1');
      cy.checkCardsExistOn(['A♠'], 'column-7');
    });

    it('should move A♦ to 1st foundation and not 2♦', () => {
      cy.clickFromTo('A♦', 'foundation-0');
      cy.clickFromTo('2♦', 'foundation-0');

      cy.checkCardsExistOn(['A♦'], 'foundation-0');
      cy.checkCardsNotExistOn(['2♦'], 'foundation-0');
      cy.checkCardsExistOn(['2♦'], 'column-6');
    });

    it('should move A♥ to 1st foundation and not move 2♣', () => {
      cy.clickFromTo('A♥', 'foundation-0');
      cy.clickFromTo('2♣', 'foundation-0');

      cy.checkCardsExistOn(['A♥'], 'foundation-0');
      cy.checkCardsNotExistOn(['2♣'], 'foundation-0');
      cy.checkCardsNotExistOn(['A♥'], 'column-3');
    });

    it('should not move A♣ to foundation', () => {
      cy.clickFromTo('A♣', 'foundation-0');
      cy.checkCardsExistOn(['A♣'], 'column-4');
      cy.checkCardsNotExistOn(['A♣'], 'foundation-0');
    });
  });

  describe('using double clicks', () => {
    it('should move A♥ - 3♥ to 1st foundation', () => {
      cy.get('[data-test="card-A♥"]').dblclick();
      cy.get('[data-test="card-2♥"]').dblclick();
      cy.get('[data-test="card-3♥"]').dblclick();

      cy.checkCardsExistOn(['A♥', '2♥', '3♥'], 'foundation-0');
      cy.checkCardsNotExistOn(['A♥', '2♥', '3♥'], 'column-3');
    });

    it('should move A♥ - 2♥ to 1st foundation and A♠ - 2♠ to 2nd foundation', () => {
      cy.get('[data-test="card-A♥"]').dblclick();
      cy.get('[data-test="card-A♠"]').dblclick();
      cy.get('[data-test="card-2♥"]').dblclick();
      cy.get('[data-test="card-2♠"]').dblclick();

      cy.checkCardsExistOn(['A♥', '2♥'], 'foundation-0');
      cy.checkCardsExistOn(['A♠', '2♠'], 'foundation-1');
      cy.checkCardsNotExistOn(['A♥', '2♥'], 'column-3');
      cy.checkCardsNotExistOn(['A♠', '2♠'], 'column-7');
    });

    it('should move A♥ - 2♥ to 1st foundation and 2♠ to 3rd foundation', () => {
      cy.clickFromTo('A♠', 'foundation-2');

      cy.get('[data-test="card-A♥"]').dblclick();
      cy.get('[data-test="card-2♥"]').dblclick();
      cy.get('[data-test="card-2♠"]').dblclick();

      cy.checkCardsExistOn(['A♥', '2♥'], 'foundation-0');
      cy.checkCardsExistOn(['A♠', '2♠'], 'foundation-2');
      cy.checkCardsNotExistOn(['A♥', '2♥'], 'column-3');
      cy.checkCardsNotExistOn(['2♠'], 'column-7');
    });

    it('should move 2♥ to 2nd foundation and 2♠ to 3rd foundation', () => {
      cy.clickFromTo('A♠', 'foundation-1');
      cy.clickFromTo('A♥', 'foundation-2');

      cy.get('[data-test="card-2♥"]').dblclick();
      cy.get('[data-test="card-2♠"]').dblclick();

      cy.checkCardsExistOn(['A♠', '2♠'], 'foundation-1');
      cy.checkCardsExistOn(['A♥', '2♥'], 'foundation-2');
      cy.checkCardsNotExistOn(['2♥'], 'column-3');
      cy.checkCardsNotExistOn(['2♠'], 'column-7');
    });
  });
});
