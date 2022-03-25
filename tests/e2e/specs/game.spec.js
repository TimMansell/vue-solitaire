import fullGameDeck from '../../fixtures/decks/fullGame.json';
import fullGameMoves from '../../fixtures/moves/fullGame.json';
import incompleteGameDeck from '../../fixtures/decks/incompleteGame.json';
import incompleteGameMoves from '../../fixtures/moves/incompleteGame.json';
import noMovesKingColumnDeck from '../../fixtures/decks/noMovesKingColumn.json';
import noMovesKingColumnMoves from '../../fixtures/moves/noMovesKingColumn.json';
import initialAceMoveDeck from '../../fixtures/decks/initialAceMove.json';
import initialAceAnd2MoveDeck from '../../fixtures/decks/initialAceAnd2Move.json';
import { mockUid } from '../../../src/mockData';

describe('Game', () => {
  describe('Default', () => {
    beforeEach(() => {
      cy.visitApp();
    });

    it('it should not show won page if game is not won', () => {
      cy.visit('#/won');

      cy.checkGameWon(false);
    });

    it('it should not show lost page if game is not lost', () => {
      cy.visit('#/lost');

      cy.checkGameLost(false);
    });
  });

  describe('Game Won', () => {
    describe('New User', () => {
      it('should win game and increment won game stats', () => {
        cy.visitApp();

        cy.setServerDeck(fullGameDeck);

        cy.checkUserStatsAreZero();

        cy.runGameWithClicks(fullGameMoves);

        cy.checkGameWon(true);

        cy.checkSummaryMoves(fullGameMoves.length);

        cy.confirmNewGame();

        cy.checkStats();
      });
    });

    describe('Existing User', () => {
      it('should win game and increment won game stats', () => {
        cy.setUser(mockUid);

        cy.visitApp();

        cy.setServerDeck(fullGameDeck);

        cy.checkStats();

        cy.runGameWithClicks(fullGameMoves);

        cy.checkGameWon(true);

        cy.checkSummaryMoves(fullGameMoves.length);

        cy.confirmNewGame();

        cy.checkStats();
      });
    });
  });

  describe('Game Lost', () => {
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

        cy.checkUserStatsAreZero();

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

        cy.checkStats();

        cy.runGameWithClicks(incompleteGameMoves);

        cy.checkGameLost(true);

        cy.checkSummaryMoves(incompleteGameMoves.length);

        cy.confirmNewGame();

        cy.checkStats();
      });
    });
  });

  describe('Game Quit', () => {
    describe('New User', () => {
      // beforeEach(() => {
      //   cy.visitApp();
      // });

      it('should quit game and increment quit game stats', () => {
        cy.visitApp();

        cy.checkUserStatsAreZero();

        cy.startNewGame();

        cy.checkStats();
      });
    });

    describe('Existing User', () => {
      // beforeEach(() => {
      //   cy.setUser(mockUid);

      //   cy.visitApp();
      // });

      it('should quit game and increment quit game stats', () => {
        cy.setUser(mockUid);

        cy.visitApp();

        cy.checkStats();

        cy.startNewGame();

        cy.checkStats();
      });
    });
  });
});
