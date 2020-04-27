import noMovesKingColumn from '../../fixtures/boards/noMovesKingColumn.json';
import noMovesAceFoundation from '../../fixtures/boards/noMovesAceFoundation.json';
import noMovesAceTwoFoundation from '../../fixtures/boards/noMovesAceTwoFoundation.json';
import foundations from '../../fixtures/boards/fullFoundation.json';

describe('No moves', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have Kc as an available move then no moves after that', () => {
    cy.setBoard(noMovesKingColumn).then(() => {
      cy.get('[data-test="column-2"]').shouldBeVisible(['Kc']);

      cy.get('[data-test="card-Qc"]').clickTo('[data-test="card-Kc"]');

      cy.get('[data-test="game-overlay"]').should('not.be.visible');

      cy.get('[data-test="card-Kc"]').clickTo('[data-test="column-1"]');

      cy.get('[data-test="game-overlay"]').should('be.visible');
    });
  });

  it('should have As as an available foundation move then no moves after that', () => {
    cy.setBoard(noMovesAceFoundation).then(() => {
      cy.get('[data-test="column-2"]').shouldBeVisible(['As']);

      cy.get('[data-test="card-Qc"]').clickTo('[data-test="card-Kc"]');

      cy.get('[data-test="game-overlay"]').should('not.be.visible');

      cy.get('[data-test="card-As"]').clickTo('[data-test="foundation-0"]');

      cy.get('[data-test="game-overlay"]').should('be.visible');
    });
  });

  it('should have 2s as an available foundation move then no moves after that', () => {
    cy.setBoard(noMovesAceTwoFoundation).then(() => {
      cy.get('[data-test="column-2"]').shouldBeVisible(['As']);

      cy.get('[data-test="card-Qc"]').clickTo('[data-test="card-Kc"]');
      cy.get('[data-test="card-As"]').clickTo('[data-test="foundation-0"]');

      cy.get('[data-test="game-overlay"]').should('not.be.visible');

      cy.get('[data-test="card-2s"]').clickTo('[data-test="foundation-0"]');

      cy.get('[data-test="game-overlay"]').should('be.visible');
    });
  });

  it('should not show lost game if game won', () => {
    cy.setBoard(foundations).then(() => {
      cy.get('[data-test="winner"]').should('not.be.visible');

      cy.get('[data-test="column-0"]').shouldBeVisible(['Ks', 'Qs']);

      cy.get('[data-test="card-Qs"]').clickTo('[data-test="foundation-3"]');
      cy.get('[data-test="card-Ks"]').clickTo('[data-test="foundation-3"]');

      cy.get('[data-test="game-overlay"]').should('not.be.visible');
    });
  });

  it('it should start a new game and reset board', () => {
    cy.setBoard(noMovesKingColumn).then(() => {
      cy.get('[data-test="column-2"]').shouldBeVisible(['Kc']);

      cy.get('[data-test="card-Qc"]').clickTo('[data-test="card-Kc"]');
      cy.get('[data-test="card-Kc"]').clickTo('[data-test="column-1"]');

      cy.get('[data-test="game-overlay"]').should('be.visible');

      cy.get('[data-test="game-overlay-btn"]').click();

      cy.get('[data-test="game-overlay"]').should('not.be.visible');
    });
  });
});
