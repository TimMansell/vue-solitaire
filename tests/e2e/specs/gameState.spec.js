import foundations from '../../fixtures/boards/fullFoundation.json';
import noMovesKingColumn from '../../fixtures/boards/noMovesKingColumn.json';

describe('Game State', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it.only('refreshing page shows same board state', () => {});

  it('clicking on new game sets new board state', () => {});

  it('refreshing page on game won shows game won state', () => {
    cy.setBoard(foundations).then(() => {
      cy.get('[data-test="card-Qs"]').dragTo('[data-test="foundation-3"]');
      cy.get('[data-test="card-Ks"]').dragTo('[data-test="foundation-3"]');
    });

    cy.get('[data-test="game-won"]').should('be.visible');

    cy.reload();

    cy.get('[data-test="game-won"]').should('be.visible');
  });

  it('refreshing page on game lost shows game lost state', () => {
    cy.setBoard(noMovesKingColumn).then(() => {
      cy.get('[data-test="card-Qc"]').clickTo('[data-test="card-Kc"]');
      cy.get('[data-test="card-Kc"]').clickTo('[data-test="column-1"]');

      cy.get('[data-test="game-lost"]').should('be.visible');

      cy.reload();

      cy.get('[data-test="game-lost"]').should('be.visible');
    });
  });
});
