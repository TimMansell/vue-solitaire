import moveKingToEmptyColumn from '../../fixtures/boards/moveKingToEmptyColumn.json';
import invalidMove from '../../fixtures/decks/invalidMove.json';

describe('Special King moves', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should move Kc to an empty column', () => {
    cy.setBoard(moveKingToEmptyColumn).then(() => {
      cy.get('[data-test="column-7"]').within(() => {
        cy.get('[data-test="card-Kc"]').should('be.visible');
      });

      cy.get('[data-test="card-Kc"]').click({ force: true });
      cy.get('[data-test="column-0"]').click();

      cy.get('[data-test="column-0"]').within(() => {
        cy.get('[data-test="card-Kc"]').should('be.visible');
      });

      cy.get('[data-test="column-7"]').within(() => {
        cy.get('[data-test="card-Kc"]').should('not.be.visible');
      });
    });
  });

  // K to not empty
  it('should not move Ks to 9d', () => {
    cy.setDeck(invalidMove).then(() => {
      cy.get('[data-test="column-7"]').within(() => {
        cy.get('[data-test="card-Ks"]').should('be.visible');
      });

      cy.get('[data-test="card-Ks"]').click();
      cy.get('[data-test="card-9d"]').click();

      cy.get('[data-test="column-1"]').within(() => {
        cy.get('[data-test="card-Ks"]').should('not.be.visible');
      });
    });
  });
});
