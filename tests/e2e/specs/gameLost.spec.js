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
    it('it should not show lost page if game is not lost', () => {
      cy.visitApp();

      cy.visit('#/lost');

      cy.checkGameLost(false);
    });

    it('should lose game, keep state on page refresh', () => {
      cy.setDeck(incompleteGameDeck).then(() => {
        cy.visitApp();
      });

      cy.runGameWithClicks(incompleteGameMoves);

      cy.checkGameLost(true);

      cy.checkSummaryMoves(6);

      cy.testShowBoard();

      cy.checkTimerIsPausedOnReload();

      cy.checkGameLost(true);
    });
  });

  describe('Variations', () => {
    it('should have K♣ as an available move then no moves after that', () => {
      cy.setDeck(noMovesKingColumnDeck).then(() => {
        cy.visitApp();
      });

      cy.runGameWithClicks(noMovesKingColumnMoves);

      cy.checkGameLost(true);
    });

    it('should have A♦ as an available foundation move then no moves after that', () => {
      cy.setDeck(initialAceMoveDeck).then(() => {
        cy.visitApp();
      });

      cy.clickFromTo('A♦', 'foundation-0');

      cy.checkGameLost(true);
    });

    it('should have 2♦ as an available foundation move then no moves after that', () => {
      cy.setDeck(initialAceAnd2MoveDeck).then(() => {
        cy.visitApp();
      });

      cy.clickFromTo('A♦', 'foundation-0');
      cy.clickFromTo('2♦', 'foundation-0');

      cy.checkGameLost(true);
    });
  });

  describe('New User', () => {
    beforeEach(() => {
      cy.setDeck(incompleteGameDeck).then(() => {
        cy.visitApp();
      });
    });

    it('should lose game and increment lost game stats', () => {
      cy.saveStats();

      cy.runGameWithClicks(incompleteGameMoves);

      cy.confirmNewGame();

      cy.checkStatsHaveIncremented({
        completed: true,
        lost: true,
        won: false,
        quit: false,
      });
    });
  });

  describe('Existing User', () => {
    beforeEach(() => {
      cy.setUser(mockUid);

      cy.setDeck(incompleteGameDeck).then(() => {
        cy.visitApp();
      });
    });

    it('should lose game and increment lost game stats', () => {
      cy.saveStats();

      cy.runGameWithClicks(incompleteGameMoves);

      cy.confirmNewGame();

      cy.checkStatsHaveIncremented({
        completed: true,
        lost: true,
        won: false,
        quit: false,
      });
    });
  });
});
