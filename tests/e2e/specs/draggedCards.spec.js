import validMoveDeck from '../../fixtures/decks/validMove.json';

describe('Dragged Cards', () => {
  beforeEach(() => {
    cy.visitApp();

    cy.mockBoard(validMoveDeck);
  });

  afterEach(() => cy.cleanUp());

  it('should drag single card', () => {
    cy.dragCardToPosition('7♦', { x: 200, y: -200 });

    cy.checkDraggedCardsLength(1);

    cy.checkCardsExistOn(['7♦'], 'dragged-cards');
    cy.checkCardsNotVisibleOn(['7♦'], 'column-2');
  });

  it('should drag correct amount of cards', () => {
    cy.dragCardToPosition('6♦', { x: 200, y: -200 });

    cy.checkDraggedCardsLength(3);

    cy.checkCardsExistOn(['6♦', '2♥'], 'dragged-cards');
    cy.checkCardsNotVisibleOn(['6♦', '2♥'], 'column-3');
  });

  it('should clear dragged cards when dropped outside of board', () => {
    cy.dragCardFromTo('6♦', 'board');

    cy.checkDraggedCardsLength(0);

    cy.checkCardsExistOn(['6♦'], 'column-3');
  });
});
