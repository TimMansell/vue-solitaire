import validMoveDeck from '../../fixtures/decks/validMove.json';

describe('Dragged Cards', () => {
  beforeEach(() => {
    cy.mockApi({
      mockDeck: validMoveDeck,
      mockInitial: true,
    });

    cy.visitApp();
  });

  afterEach(() => {
    cy.clearTest();
  });

  it('should drag single card', () => {
    cy.get('[data-test="card-7♦"]').drag({ x: 200, y: -200 });

    cy.checkDraggedCardsNumber(1);

    cy.get('[data-test="dragged-cards"]').shouldContain(['7♦']);

    cy.get('[data-test="column-2"]').shouldNotContain(['7♦']);
  });

  it('should drag correct amount of cards', () => {
    cy.get('[data-test="card-6♦"]').drag({ x: 200, y: -200 });

    cy.checkDraggedCardsNumber(3);

    cy.get('[data-test="dragged-cards"]').shouldContain(['6♦', '2♥']);

    cy.get('[data-test="column-3"]').shouldNotContain(['6♦', '2♥']);
  });

  it('should clear dragged cards when dropped outside of board', () => {
    cy.dragFromTo('6♦', 'board');

    cy.checkDraggedCardsNumber(0);

    cy.get('[data-test="column-3"]').shouldContain(['6♦']);
  });
});
