import validMoveDeck from '../../fixtures/decks/validMove.json';

const moveLeft = 200;
const moveTop = -200;

describe('Dragged Cards', () => {
  beforeEach(() => {
    cy.visitApp({ mockDeck: validMoveDeck });
  });

  afterEach(() => {
    cy.clearTest();
  });

  it('should move dragged cards to correct position', () => {
    cy.get('[data-test="card-6♦"]').then((card) => {
      cy.get('[data-test="card-6♦"]').drag(moveLeft, moveTop);

      cy.get('[data-test="dragged-cards"]').then((cards) => {
        const { offsetLeft, offsetTop } = card[0];
        const { clientWidth } = cards[0];
        const left = offsetLeft + moveLeft - clientWidth / 2;
        const top = offsetTop + moveTop;

        cy.get('[data-test="dragged-cards-container"]')
          .should('have.css', 'top', `${top}px`)
          .should('have.css', 'left', `${left}px`);
      });
    });
  });

  it('should drag single card', () => {
    cy.get('[data-test="card-7♦"]').drag(moveLeft, moveTop);

    cy.get('[data-test="dragged-cards"]')
      .children()
      .should('have.length', 1);

    cy.get('[data-test="dragged-cards"]').within(() => {
      cy.get('[data-test="card-7♦"]').should('be.visible');
    });

    cy.get('[data-test="columns"]').within(() => {
      cy.get('[data-test="card-7♦"]').should('not.be.visible');
    });
  });

  it('should drag correct amount of cards', () => {
    cy.get('[data-test="card-6♦"]').drag(moveLeft, moveTop);

    cy.get('[data-test="dragged-cards"]')
      .children()
      .should('have.length', 3);

    cy.get('[data-test="dragged-cards"]').within(() => {
      cy.get('[data-test="card-6♦"]').should('be.visible');
      cy.get('[data-test="card-2♥"]').should('be.visible');
    });

    cy.get('[data-test="columns"]').within(() => {
      cy.get('[data-test="card-6♦"]').should('not.be.visible');
      cy.get('[data-test="card-2♥"]').should('not.be.visible');
    });
  });

  it('should clear dragged cards when dropped outside of board', () => {
    cy.dragFromTo('card-6♦', 'board');

    cy.get('[data-test="columns"]').within(() => {
      cy.get('[data-test="card-6♦"]').should('be.visible');
    });
  });
});
