import noMovesKingColumn from '../../fixtures/boards/noMovesKingColumn.json';
import noMovesAceFoundation from '../../fixtures/boards/noMovesAceFoundation.json';
import noMovesAceTwoFoundation from '../../fixtures/boards/noMovesAceTwoFoundation.json';
import foundations from '../../fixtures/boards/fullFoundation.json';

describe('No moves', () => {
  beforeEach(() => {
    cy.visitApp();
  });

  afterEach(() => {
    cy.clearLocalStorage();
  });

  it('should have K♣ as an available move then no moves after that', () => {
    cy.setBoard(noMovesKingColumn).then(() => {
      cy.get('[data-test="column-2"]').shouldContain(['K♣']);

      cy.get('[data-test="card-Q♣"]').clickTo('[data-test="card-K♣"]');

      cy.get('[data-test="game-lost"]').should('not.exist');

      cy.get('[data-test="card-K♣"]').clickTo('[data-test="column-1"]');

      cy.get('[data-test="game-lost"]').should('be.visible');

      cy.wait('@waitForCreateUserAPI');

      cy.checkGameSummaryValues({ moves: 2 });
    });
  });

  it('should have A♠ as an available foundation move then no moves after that', () => {
    cy.setBoard(noMovesAceFoundation).then(() => {
      cy.get('[data-test="column-2"]').shouldContain(['A♠']);

      cy.get('[data-test="card-Q♣"]').clickTo('[data-test="card-K♣"]');

      cy.get('[data-test="game-lost"]').should('not.exist');

      cy.get('[data-test="card-A♠"]').clickTo('[data-test="foundation-0"]');

      cy.get('[data-test="game-lost"]').should('be.visible');

      cy.wait('@waitForCreateUserAPI');

      cy.checkGameSummaryValues({ moves: 2 });
    });
  });

  it('should have 2♠ as an available foundation move then no moves after that', () => {
    cy.setBoard(noMovesAceTwoFoundation).then(() => {
      cy.get('[data-test="column-2"]').shouldContain(['A♠']);

      cy.get('[data-test="card-Q♣"]').clickTo('[data-test="card-K♣"]');
      cy.get('[data-test="card-A♠"]').clickTo('[data-test="foundation-0"]');

      cy.get('[data-test="game-lost"]').should('not.exist');

      cy.get('[data-test="card-2♠"]').clickTo('[data-test="foundation-0"]');

      cy.get('[data-test="game-lost"]').should('be.visible');

      cy.wait('@waitForCreateUserAPI');

      cy.checkGameSummaryValues({ moves: 3 });
    });
  });

  it('should not show lost game if game won', () => {
    cy.setBoard(foundations).then(() => {
      cy.get('[data-test="column-0"]').shouldContain(['K♠', 'Q♠']);

      cy.get('[data-test="card-Q♠"]').clickTo('[data-test="foundation-3"]');
      cy.get('[data-test="card-K♠"]').clickTo('[data-test="foundation-3"]');

      cy.wait('@waitForCreateUserAPI');

      cy.get('[data-test="game-lost"]').should('not.exist');
    });
  });

  it('it should start a new game and reset board', () => {
    cy.setBoard(noMovesKingColumn).then(() => {
      cy.get('[data-test="column-2"]').shouldContain(['K♣']);

      cy.get('[data-test="card-Q♣"]').clickTo('[data-test="card-K♣"]');
      cy.get('[data-test="card-K♣"]').clickTo('[data-test="column-1"]');

      cy.wait('@waitForCreateUserAPI');

      cy.get('[data-test="game-lost"]').should('be.visible');

      cy.get(
        '[data-test="game-overlay-btns"] [data-test="new-game-btn"]'
      ).click();

      cy.wait('@waitForStatsAPI');

      cy.get('[data-test="game-lost"]').should('not.exist');
    });
  });

  it('it should hide and show board after lost game', () => {
    cy.setBoard(noMovesKingColumn).then(() => {
      cy.get('[data-test="card-Q♣"]').clickTo('[data-test="card-K♣"]');
      cy.get('[data-test="card-K♣"]').clickTo('[data-test="column-1"]');

      cy.get('[data-test="game-overlay-btns"] [data-test="show-board-btn"]').as(
        'showBoardButton'
      );

      cy.get('@showBoardButton').click();

      cy.get('[data-test="game-lost"]').should(
        'have.class',
        'game-overlay--see-through'
      );

      cy.get('[data-test="game-overlay-logo"]').should('not.be.visible');
      cy.get('[data-test="game-overlay-header"]').should('not.be.visible');
      cy.get('[data-test="game-overlay-msg"]').should('not.be.visible');

      cy.get('@showBoardButton').click();

      cy.get('[data-test="game-lost"]').should(
        'not.have.class',
        'game-overlay--see-through'
      );

      cy.get('[data-test="game-overlay-logo"]').should('be.visible');
      cy.get('[data-test="game-overlay-header"]').should('be.visible');
      cy.get('[data-test="game-overlay-msg"]').should('be.visible');
    });
  });
});
