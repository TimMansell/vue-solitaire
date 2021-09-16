import fullGameDeck from '../../fixtures/decks/fullGame.json';

describe('Invalid moves', () => {
  beforeEach(() => {
    cy.visitApp({
      mockDeck: fullGameDeck,
      mockInitialAPi: true,
      mockApi: true,
    });
  });

  afterEach(() => {
    cy.clearTest();
  });

  describe('using drag and drop', () => {
    it('should not move 9♥ to 4♣ (invalid value & suit)', () => {
      cy.dragFromTo('card-9♥', 'card-4♣');

      cy.get('[data-test="column-7"]').shouldNotContain(['9♥']);
    });

    it('should not move 2♠ to 4♣ (lower value and invalid suit)', () => {
      cy.dragFromTo('card-2♠', 'card-4♣');

      cy.get('[data-test="column-7"]').shouldNotContain(['2♠']);
    });

    it('should not move 6♥ to 4♣ (higher value and invalid suit)', () => {
      cy.dragFromTo('card-6♥', 'card-4♣');

      cy.get('[data-test="column-7"]').shouldNotContain(['6♥']);
    });

    it('should not move 3♦ to 4♣ (valid value and invalid suit)', () => {
      cy.dragFromTo('card-3♦', 'card-4♣');

      cy.get('[data-test="column-7"]').shouldNotContain(['3♦']);
    });

    it('should not move 8♣ to 4♣ (invalid value and valid suit)', () => {
      cy.dragFromTo('card-8♣', 'card-4♣');

      cy.get('[data-test="column-1"]').shouldNotContain(['8♣']);
    });
  });

  describe('using clicks', () => {
    it('should not move 9♥ to 4♣ (invalid value & suit)', () => {
      cy.get('[data-test="card-9♥"]').clickTo('[data-test="card-4♣"]');

      cy.get('[data-test="column-7"]').shouldNotContain(['9♥']);
    });

    it('should not move 2♠ to 4♣ (lower value and invalid suit)', () => {
      cy.get('[data-test="card-2♠"]').clickTo('[data-test="card-4♣"]');

      cy.get('[data-test="column-7"]').shouldNotContain(['2♠']);
    });

    it('should not move 6♥ to 4♣ (higher value and invalid suit)', () => {
      cy.get('[data-test="card-6♥"]').clickTo('[data-test="card-4♣"]');

      cy.get('[data-test="column-7"]').shouldNotContain(['6♥']);
    });

    it('should not move 3♦ to 4♣ (valid value and invalid suit)', () => {
      cy.get('[data-test="card-3♦"]').clickTo('[data-test="card-4♣"]');

      cy.get('[data-test="column-7"]').shouldNotContain(['3♦']);
    });

    it('should not move 8♣ to 4♣ (invalid value and valid suit)', () => {
      cy.get('[data-test="card-8♣"]').clickTo('[data-test="card-4♣"]');

      cy.get('[data-test="column-1"]').shouldNotContain(['8♣']);
    });
  });
});
