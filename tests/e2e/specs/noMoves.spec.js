import incompleteGameDeck from '../../fixtures/decks/incompleteGame.json';
import incompleteGameMoves from '../../fixtures/moves/incompleteGame.json';
import noMovesKingColumnDeck from '../../fixtures/decks/noMovesKingColumn.json';
import noMovesKingColumnMoves from '../../fixtures/moves/noMovesKingColumn.json';
import initialAceMoveDeck from '../../fixtures/decks/initialAceMove.json';
import initialAceAnd2MoveDeck from '../../fixtures/decks/initialAceAnd2Move.json';

describe('No moves', () => {
  afterEach(() => {
    cy.clearTest();
  });

  it('should have K♣ as an available move then no moves after that', () => {
    cy.visitApp({ mockDeck: noMovesKingColumnDeck });

    cy.runGameWithClicks(noMovesKingColumnMoves);

    cy.get('[data-test="game-lost"]').should('be.visible');
  });

  it('should have A♦ as an available foundation move then no moves after that', () => {
    cy.visitApp({ mockDeck: initialAceMoveDeck });

    cy.get('[data-test="card-A♦"]').clickTo('[data-test="foundation-0"]');

    cy.get('[data-test="game-lost"]').should('be.visible');
  });

  it('should have 2♦ as an available foundation move then no moves after that', () => {
    cy.visitApp({ mockDeck: initialAceAnd2MoveDeck });

    cy.get('[data-test="card-A♦"]').clickTo('[data-test="foundation-0"]');
    cy.get('[data-test="card-2♦"]').clickTo('[data-test="foundation-0"]');

    cy.get('[data-test="game-lost"]').should('be.visible');
  });

  it('it should hide and show board after lost game, then reset board', () => {
    cy.visitApp({ mockDeck: incompleteGameDeck });

    cy.runGameWithClicks(incompleteGameMoves);

    cy.get('[data-test="game-lost"]').should('be.visible');

    cy.showBoard();

    cy.get('[data-test="game-lost"]').should(
      'have.class',
      'game-overlay--see-through'
    );

    cy.get('[data-test="game-overlay-logo"]').should('not.be.visible');
    cy.get('[data-test="game-overlay-header"]').should('not.be.visible');
    cy.get('[data-test="game-overlay-msg"]').should('not.be.visible');

    cy.showBoard();

    cy.get('[data-test="game-lost"]').should(
      'not.have.class',
      'game-overlay--see-through'
    );

    cy.get('[data-test="game-overlay-logo"]').should('be.visible');
    cy.get('[data-test="game-overlay-header"]').should('be.visible');
    cy.get('[data-test="game-overlay-msg"]').should('be.visible');

    cy.confirmNewGame();

    cy.get('[data-test="game-lost"]').should('not.exist');
  });
});
