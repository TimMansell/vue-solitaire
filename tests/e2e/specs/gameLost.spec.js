import incompleteGameDeck from '../../fixtures/decks/incompleteGame.json';
import incompleteGameMoves from '../../fixtures/moves/incompleteGame.json';
import noMovesKingColumnDeck from '../../fixtures/decks/noMovesKingColumn.json';
import noMovesKingColumnMoves from '../../fixtures/moves/noMovesKingColumn.json';
import initialAceMoveDeck from '../../fixtures/decks/initialAceMove.json';
import initialAceAnd2MoveDeck from '../../fixtures/decks/initialAceAnd2Move.json';
import { mockUid } from '../../../src/mockData';

describe('Game Lost', () => {
  afterEach(() => {
    cy.clearTest();
  });

  describe('Default', () => {
    beforeEach(() => {
      cy.visitApp();
    });

    it('it should not show lost page if game is not lost', () => {
      cy.visit('#/lost');

      cy.checkGameLost(false);
    });
  });

  describe('Variations', () => {
    beforeEach(() => {
      cy.visitApp();
    });

    it('should have K♣ as an available move then no moves after that', () => {
      cy.setServerDeck(noMovesKingColumnDeck);

      cy.runGameWithClicks(noMovesKingColumnMoves);

      cy.checkGameLost(true);

      cy.checkSummaryMoves(noMovesKingColumnMoves.length);

      cy.testShowBoard();
    });

    it('should have A♦ as an available foundation move then no moves after that', () => {
      cy.setServerDeck(initialAceMoveDeck);

      cy.clickFromTo('A♦', 'foundation-0');

      cy.checkGameLost(true);

      cy.checkSummaryMoves(1);

      cy.testShowBoard();
    });

    it('should have 2♦ as an available foundation move then no moves after that', () => {
      cy.setServerDeck(initialAceAnd2MoveDeck);

      cy.clickFromTo('A♦', 'foundation-0');
      cy.clickFromTo('2♦', 'foundation-0');

      cy.checkGameLost(true);

      cy.checkSummaryMoves(2);

      cy.testShowBoard();
    });
  });

  describe('New User', () => {
    it('should lose game and increment lost game stats', () => {
      cy.visitApp();

      cy.setServerDeck(incompleteGameDeck);

      cy.runGameWithClicks(incompleteGameMoves);

      cy.checkGameLost(true);

      cy.checkSummaryMoves(incompleteGameMoves.length);

      cy.confirmNewGame();

      cy.checkStats();
    });
  });

  describe('Existing User', () => {
    it('should lose game and increment lost game stats', () => {
      cy.setUser(mockUid);

      cy.visitApp();

      cy.setServerDeck(incompleteGameDeck);

      cy.runGameWithClicks(incompleteGameMoves);

      cy.checkGameLost(true);

      cy.checkSummaryMoves(incompleteGameMoves.length);

      cy.confirmNewGame();

      cy.checkStats();
    });
  });
});
