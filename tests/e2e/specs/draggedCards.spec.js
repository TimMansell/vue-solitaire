import validMove from '../../fixtures/boards/validMove.json';

const moveLeft = 200;
const moveTop = -200;

describe('Dragged Cards', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
  });

  it('should move dragged cards to correct position', () => {
    cy.setBoard(validMove).then(() => {
      cy.get('[data-test="column-3"]').shouldContain(['6♦']);

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
  });

  it('should drag single card', () => {
    cy.setBoard(validMove).then(() => {
      cy.get('[data-test="column-2"]').shouldContain(['7♦']);

      cy.get('[data-test="card-7♦"]').drag(moveLeft, moveTop);

      cy.get('[data-test="dragged-cards"]')
        .children()
        .should('have.length', 1);

      cy.get('[data-test="dragged-cards"]').within(() => {
        cy.get('[data-test="card-7♦"]').should('be.visible');
      });

      cy.get('[data-test="columns"]').within(() => {
        cy.get('[data-test="card-7♦"]').should('have.css', 'opacity', '0');
      });
    });
  });

  it('should drag correct amount of cards', () => {
    cy.setBoard(validMove).then(() => {
      cy.get('[data-test="column-3"]').shouldContain(['6♦']);

      cy.get('[data-test="card-6♦"]').drag(moveLeft, moveTop);

      cy.get('[data-test="dragged-cards"]')
        .children()
        .should('have.length', 3);

      cy.get('[data-test="dragged-cards"]').within(() => {
        cy.get('[data-test="card-6♦"]').should('be.visible');
        cy.get('[data-test="card-2♥"]').should('be.visible');
      });

      cy.get('[data-test="columns"]').within(() => {
        cy.get('[data-test="card-6♦"]').should('have.css', 'opacity', '0');
        cy.get('[data-test="card-2♥"]').should('have.css', 'opacity', '0');
      });
    });
  });

  it('should clear dragged cards when dropped outside of board', () => {
    cy.setBoard(validMove).then(() => {
      cy.get('[data-test="column-3"]').shouldContain(['6♦']);

      cy.get('[data-test="card-9♦"]').dragTo('[data-test="board"]');

      cy.get('[data-test="columns"]').within(() => {
        cy.get('[data-test="card-6♦"]').should('be.visible');
      });
    });
  });
});
