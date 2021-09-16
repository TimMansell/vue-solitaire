import AcesDeck from '../../fixtures/decks/acesToFoundation.json';

describe('Foundation moves', () => {
  beforeEach(() => {
    cy.visitApp({ mockDeck: AcesDeck, mockInitialApi: true });
  });

  afterEach(() => {
    cy.clearTest();
  });

  describe('using drag and drop', () => {
    it('should move A♠ to 1st foundation', () => {
      cy.dragFromTo('card-A♠', 'foundation-0');

      cy.get('[data-test="foundation-0"]').shouldContain(['A♠']);

      cy.get('[data-test="column-7"]').shouldNotContain(['A♠']);
    });

    it('should move A♠ to 2nd foundation', () => {
      cy.dragFromTo('card-A♠', 'foundation-1');

      cy.get('[data-test="foundation-1"]').shouldContain(['A♠']);

      cy.get('[data-test="column-7"]').shouldNotContain(['A♠']);
    });

    it('should move A♠ to 3rd foundation', () => {
      cy.dragFromTo('card-A♠', 'foundation-2');

      cy.get('[data-test="foundation-2"]').shouldContain(['A♠']);

      cy.get('[data-test="column-7"]').shouldNotContain(['A♠']);
    });

    it('should move A♠ to 4th foundation', () => {
      cy.dragFromTo('card-A♠', 'foundation-3');

      cy.get('[data-test="foundation-3"]').shouldContain(['A♠']);

      cy.get('[data-test="column-7"]').shouldNotContain(['A♠']);
    });

    it('should move A♥, 2♥, 3♥ to 1st foundation', () => {
      cy.dragFromTo('card-A♥', 'foundation-0');

      cy.dragFromTo('card-2♥', 'foundation-0');

      cy.dragFromTo('card-3♥', 'foundation-0');

      cy.get('[data-test="foundation-0"]').shouldContain(['A♥', '2♥', '3♥']);

      cy.get('[data-test="column-3"]').shouldNotContain(['A♥', '2♥', '3♥']);
    });

    it('should move A♥ then 2♥ and A♠ then 2♠ to 2nd & 4th foundation', () => {
      cy.dragFromTo('card-A♥', 'foundation-1');

      cy.dragFromTo('card-2♥', 'foundation-1');

      cy.get('[data-test="foundation-1"]').shouldContain(['A♥', '2♥']);

      cy.get('[data-test="column-3"]').shouldNotContain(['A♥', '2♥']);

      cy.dragFromTo('card-A♠', 'foundation-3');

      cy.dragFromTo('card-2♠', 'foundation-3');

      cy.get('[data-test="foundation-3"]').shouldContain(['A♠', '2♠']);

      cy.get('[data-test="column-7"]').shouldNotContain(['A♠', '2♠']);
    });

    it('should move A♥ then 2♥ to 2nd foundation and not move A♠ to same foundation', () => {
      cy.dragFromTo('card-A♥', 'foundation-1');
      cy.dragFromTo('card-2♥', 'foundation-1');

      cy.get('[data-test="foundation-1"]').shouldContain(['A♥', '2♥']);

      cy.get('[data-test="column-3"]').shouldNotContain(['A♥', '2♥']);

      cy.dragFromTo('card-A♠', 'foundation-1');

      cy.get('[data-test="foundation-1"]').shouldNotContain(['A♠']);

      cy.get('[data-test="column-7"]').shouldContain(['A♠']);
    });

    it('should move A♦ to 1st foundation and not 2♦', () => {
      cy.dragFromTo('card-A♦', 'foundation-0');
      cy.dragFromTo('card-2♦', 'foundation-0');

      cy.get('[data-test="foundation-0"]').shouldContain(['A♦']);
      cy.get('[data-test="foundation-0"]').shouldNotContain(['2♦']);

      cy.get('[data-test="column-6"]').shouldContain(['2♦']);
    });

    it('should move A♥ to 1st foundation and not move 2♣', () => {
      cy.dragFromTo('card-A♥', 'foundation-0');

      cy.dragFromTo('card-2♣', 'foundation-0');

      cy.get('[data-test="foundation-0"]').shouldContain(['A♥']);
      cy.get('[data-test="foundation-0"]').shouldNotContain(['2♣']);

      cy.get('[data-test="column-3"]').shouldNotContain(['A♥']);
    });

    it('should not move A♣ to foundation', () => {
      cy.dragFromTo('card-A♣', 'foundation-0');

      cy.get('[data-test="column-4"]').shouldContain(['A♣']);

      cy.get('[data-test="foundation-0"]').shouldNotContain(['A♣']);
    });
  });

  describe('using clicks', () => {
    it('should move A♠ to 1st foundation', () => {
      cy.get('[data-test="card-A♠"]').clickTo('[data-test="foundation-0"]');

      cy.get('[data-test="foundation-0"]').shouldContain(['A♠']);

      cy.get('[data-test="column-7"]').shouldNotContain(['A♠']);
    });

    it('should move A♠ to 2nd foundation', () => {
      cy.get('[data-test="card-A♠"]').clickTo('[data-test="foundation-1"]');

      cy.get('[data-test="foundation-1"]').shouldContain(['A♠']);

      cy.get('[data-test="column-7"]').shouldNotContain(['A♠']);
    });

    it('should move A♠ to 3rd foundation', () => {
      cy.get('[data-test="card-A♠"]').clickTo('[data-test="foundation-2"]');

      cy.get('[data-test="foundation-2"]').shouldContain(['A♠']);

      cy.get('[data-test="column-7"]').shouldNotContain(['A♠']);
    });

    it('should move A♠ to 4th foundation', () => {
      cy.get('[data-test="card-A♠"]').clickTo('[data-test="foundation-3"]');

      cy.get('[data-test="foundation-3"]').shouldContain(['A♠']);

      cy.get('[data-test="column-7"]').shouldNotContain(['A♠']);
    });

    it('should move A♥, 2♥, 3♥ to 1st foundation', () => {
      cy.get('[data-test="card-A♥"]').clickTo('[data-test="foundation-0"]');

      cy.get('[data-test="card-2♥"]').clickTo('[data-test="foundation-0"]');

      cy.get('[data-test="card-3♥"]').clickTo('[data-test="foundation-0"]');

      cy.get('[data-test="foundation-0"]').shouldContain(['A♥', '2♥', '3♥']);

      cy.get('[data-test="column-3"]').shouldNotContain(['A♥', '2♥', '3♥']);
    });

    it('should move A♥ then 2♥ and A♠ then 2♠ to 2nd & 4th foundation', () => {
      cy.get('[data-test="card-A♥"]').clickTo('[data-test="foundation-1"]');

      cy.get('[data-test="card-2♥"]').clickTo('[data-test="foundation-1"]');

      cy.get('[data-test="foundation-1"]').shouldContain(['A♥', '2♥']);

      cy.get('[data-test="column-3"]').shouldNotContain(['A♥', '2♥']);

      cy.get('[data-test="card-A♠"]').clickTo('[data-test="foundation-3"]');

      cy.get('[data-test="card-2♠"]').clickTo('[data-test="foundation-3"]');

      cy.get('[data-test="foundation-3"]').shouldContain(['A♠', '2♠']);

      cy.get('[data-test="column-7"]').shouldNotContain(['A♠', '2♠']);
    });

    it('should move A♥ then 2♥ to 2nd foundation and not move A♠ to same foundation', () => {
      cy.get('[data-test="card-A♥"]').clickTo('[data-test="foundation-1"]');
      cy.get('[data-test="card-2♥"]').clickTo('[data-test="foundation-1"]');

      cy.get('[data-test="foundation-1"]').shouldContain(['A♥', '2♥']);

      cy.get('[data-test="column-3"]').shouldNotContain(['A♥', '2♥']);

      cy.get('[data-test="card-A♠"]').clickTo('[data-test="foundation-1"]');

      cy.get('[data-test="foundation-1"]').shouldNotContain(['A♠']);

      cy.get('[data-test="column-7"]').shouldContain(['A♠']);
    });

    it('should move A♦ to 1st foundation and not 2♦', () => {
      cy.get('[data-test="card-A♦"]').clickTo('[data-test="foundation-0"]');

      cy.get('[data-test="card-2♦"]').clickTo('[data-test="foundation-0"]');

      cy.get('[data-test="foundation-0"]').shouldContain(['A♦']);
      cy.get('[data-test="foundation-0"]').shouldNotContain(['2♦']);

      cy.get('[data-test="column-6"]').shouldContain(['2♦']);
    });

    it('should move A♥ to 1st foundation and not move 2♣', () => {
      cy.get('[data-test="card-A♥"]').clickTo('[data-test="foundation-0"]');

      cy.get('[data-test="card-2♣"]').clickTo('[data-test="foundation-0"]');

      cy.get('[data-test="foundation-0"]').shouldContain(['A♥']);
      cy.get('[data-test="foundation-0"]').shouldNotContain(['2♣']);

      cy.get('[data-test="column-3"]').shouldNotContain(['A♥']);
    });

    it('should not move A♣ to foundation', () => {
      cy.get('[data-test="card-A♣"]').clickTo('[data-test="foundation-0"]');

      cy.get('[data-test="column-4"]').shouldContain(['A♣']);

      cy.get('[data-test="foundation-0"]').shouldNotContain(['A♣']);
    });
  });

  describe('using double clicks', () => {
    it('should move A♥ - 3♥ to 1st foundation', () => {
      cy.get('[data-test="card-A♥"]').dblclick();
      cy.get('[data-test="card-2♥"]').dblclick();
      cy.get('[data-test="card-3♥"]').dblclick();

      cy.get('[data-test="foundation-0"]').shouldContain(['A♥', '2♥', '3♥']);

      cy.get('[data-test="column-3"]').shouldNotContain(['A♥', '2♥', '3♥']);
    });

    it('should move A♥ - 2♥ to 1st foundation and A♠ - 2♠ to 2nd foundation', () => {
      cy.get('[data-test="card-A♥"]').dblclick();
      cy.get('[data-test="card-A♠"]').dblclick();
      cy.get('[data-test="card-2♥"]').dblclick();
      cy.get('[data-test="card-2♠"]').dblclick();

      cy.get('[data-test="foundation-0"]').shouldContain(['A♥', '2♥']);
      cy.get('[data-test="foundation-1"]').shouldContain(['A♠', '2♠']);

      cy.get('[data-test="column-3"]').shouldNotContain(['A♥', '2♥']);
      cy.get('[data-test="column-7"]').shouldNotContain(['A♠', '2♠']);
    });

    it('should move A♥ - 2♥ to 1st foundation and 2♠ to 3rd foundation', () => {
      cy.get('[data-test="card-A♠"]').clickTo('[data-test="foundation-2"]');

      cy.get('[data-test="card-A♥"]').dblclick();
      cy.get('[data-test="card-2♥"]').dblclick();
      cy.get('[data-test="card-2♠"]').dblclick();

      cy.get('[data-test="foundation-0"]').shouldContain(['A♥', '2♥']);
      cy.get('[data-test="foundation-2"]').shouldContain(['A♠', '2♠']);

      cy.get('[data-test="column-3"]').shouldNotContain(['A♥', '2♥']);
      cy.get('[data-test="column-7"]').shouldNotContain(['2♠']);
    });

    it('should move 2♥ to 2nd foundation and 2♠ to 3rd foundation', () => {
      cy.get('[data-test="card-A♠"]').clickTo('[data-test="foundation-1"]');
      cy.get('[data-test="card-A♥"]').clickTo('[data-test="foundation-2"]');

      cy.get('[data-test="card-2♥"]').dblclick();
      cy.get('[data-test="card-2♠"]').dblclick();

      cy.get('[data-test="foundation-1"]').shouldContain(['A♠', '2♠']);
      cy.get('[data-test="foundation-2"]').shouldContain(['A♥', '2♥']);

      cy.get('[data-test="column-3"]').shouldNotContain(['2♥']);
      cy.get('[data-test="column-7"]').shouldNotContain(['2♠']);
    });
  });
});
