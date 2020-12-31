import noMovesKingColumn from '../../fixtures/boards/noMovesKingColumn.json';
import noMovesAceFoundation from '../../fixtures/boards/noMovesAceFoundation.json';
import noMovesAceTwoFoundation from '../../fixtures/boards/noMovesAceTwoFoundation.json';
import foundations from '../../fixtures/boards/fullFoundation.json';

describe('No moves', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have K♣ as an available move then no moves after that', () => {
    cy.setBoard(noMovesKingColumn).then(() => {
      cy.get('[data-test="column-2"]').shouldContain(['K♣']);

      cy.get('[data-test="card-Q♣"]').clickTo('[data-test="card-K♣"]');

      cy.get('[data-test="game-lost"]').should('not.be.visible');

      cy.get('[data-test="card-K♣"]').clickTo('[data-test="column-1"]');

      cy.get('[data-test="game-lost"]').should('be.visible');
    });
  });

  it('should have A♠ as an available foundation move then no moves after that', () => {
    cy.setBoard(noMovesAceFoundation).then(() => {
      cy.get('[data-test="column-2"]').shouldContain(['A♠']);

      cy.get('[data-test="card-Q♣"]').clickTo('[data-test="card-K♣"]');

      cy.get('[data-test="game-lost"]').should('not.be.visible');

      cy.get('[data-test="card-A♠"]').clickTo('[data-test="foundation-0"]');

      cy.get('[data-test="game-lost"]').should('be.visible');
    });
  });

  it('should have 2♠ as an available foundation move then no moves after that', () => {
    cy.setBoard(noMovesAceTwoFoundation).then(() => {
      cy.get('[data-test="column-2"]').shouldContain(['A♠']);

      cy.get('[data-test="card-Q♣"]').clickTo('[data-test="card-K♣"]');
      cy.get('[data-test="card-A♠"]').clickTo('[data-test="foundation-0"]');

      cy.get('[data-test="game-lost"]').should('not.be.visible');

      cy.get('[data-test="card-2♠"]').clickTo('[data-test="foundation-0"]');

      cy.get('[data-test="game-lost"]').should('be.visible');
    });
  });

  it('should not show lost game if game won', () => {
    cy.setBoard(foundations).then(() => {
      cy.get('[data-test="winner"]').should('not.be.visible');

      cy.get('[data-test="column-0"]').shouldContain(['K♠', 'Q♠']);

      cy.get('[data-test="card-Q♠"]').clickTo('[data-test="foundation-3"]');
      cy.get('[data-test="card-K♠"]').clickTo('[data-test="foundation-3"]');

      cy.get('[data-test="game-lost"]').should('not.be.visible');
    });
  });

  it('it should start a new game and reset board', () => {
    cy.setBoard(noMovesKingColumn).then(() => {
      cy.get('[data-test="column-2"]').shouldContain(['K♣']);

      cy.get('[data-test="card-Q♣"]').clickTo('[data-test="card-K♣"]');
      cy.get('[data-test="card-K♣"]').clickTo('[data-test="column-1"]');

      cy.get('[data-test="game-lost"]').should('be.visible');

      cy.get('[data-test="game-overlay-btns"]').click();

      cy.get('[data-test="game-lost"]').should('not.be.visible');
    });
  });
});
