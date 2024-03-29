import fullGameDeck from '../../../src/services/solitaire/fixtures/decks/fullGame.json';
import fullGameMoves from '../../../src/services/solitaire/fixtures/moves/fullGame.json';
import incompleteGameDeck from '../../../src/services/solitaire/fixtures/decks/incompleteGame.json';
import incompleteGameMoves from '../../../src/services/solitaire/fixtures/moves/incompleteGame.json';
import noMovesKingColumnDeck from '../../../src/services/solitaire/fixtures/decks/noMovesKingColumn.json';
import noMovesKingColumnMoves from '../../../src/services/solitaire/fixtures/moves/noMovesKingColumn.json';
import initialAceMoveDeck from '../../../src/services/solitaire/fixtures/decks/initialAceMove.json';
import initialAceAnd2MoveDeck from '../../../src/services/solitaire/fixtures/decks/initialAceAnd2Move.json';

describe('Game', () => {
  afterEach(() => cy.cleanUp());

  describe('Default', () => {
    beforeEach(() => {
      cy.visitApp();
    });

    it('it should not show won page if game is not won', () => {
      cy.visit('/won');

      cy.checkWonPage(false);
    });

    it('it should not show lost page if game is not lost', () => {
      cy.visit('/lost');

      cy.checkLostPage(false);
    });
  });

  describe('Game Won', () => {
    describe('New User', () => {
      it('should win game and increment won game stats', () => {
        cy.visitApp();

        cy.mockBoard(fullGameDeck);

        cy.getStats().then((stats) => {
          cy.checkStatsAre(stats);

          cy.runGameWithClicks(fullGameMoves);

          cy.checkWonPage(true);

          cy.checkSummaryMoves(fullGameMoves.length);

          cy.confirmNewGame();

          cy.checkStatsAre(stats, [1, 1, 0, 0]);
        });
      });
    });

    describe('Existing User', () => {
      it('should win game and increment won game stats', () => {
        cy.mockUser();

        cy.visitApp();

        cy.mockBoard(fullGameDeck);

        cy.getStats().then((stats) => {
          cy.checkStatsAre(stats);

          cy.runGameWithClicks(fullGameMoves);

          cy.checkWonPage(true);

          cy.checkSummaryMoves(fullGameMoves.length);

          cy.confirmNewGame();

          cy.checkStatsAre(stats, [1, 1, 0, 0]);
        });
      });
    });
  });

  describe('Game Lost', () => {
    describe('Variations', () => {
      beforeEach(() => {
        cy.visitApp();
      });

      it('should have K♣ as an available move then no moves after that', () => {
        cy.mockBoard(noMovesKingColumnDeck);

        cy.runGameWithClicks(noMovesKingColumnMoves);

        cy.checkLostPage(true);

        cy.checkSummaryMoves(noMovesKingColumnMoves.length);

        cy.testShowBoard();
      });

      it('should have A♦ as an available foundation move then no moves after that', () => {
        cy.mockBoard(initialAceMoveDeck);

        cy.clickFromTo('A♦', 'foundation-0');

        cy.checkLostPage(true);

        cy.checkSummaryMoves(1);

        cy.testShowBoard();
      });

      it('should have 2♦ as an available foundation move then no moves after that', () => {
        cy.mockBoard(initialAceAnd2MoveDeck);

        cy.clickFromTo('A♦', 'foundation-0');
        cy.clickFromTo('2♦', 'foundation-0');

        cy.checkLostPage(true);

        cy.checkSummaryMoves(2);

        cy.testShowBoard();
      });
    });

    describe('New User', () => {
      it('should lose game and increment lost game stats', () => {
        cy.visitApp();

        cy.mockBoard(incompleteGameDeck);

        cy.getStats().then((stats) => {
          cy.checkStatsAre(stats);

          cy.runGameWithClicks(incompleteGameMoves);

          cy.checkLostPage(true);

          cy.checkSummaryMoves(incompleteGameMoves.length);

          cy.confirmNewGame();

          cy.checkStatsAre(stats, [1, 0, 1, 0]);
        });
      });
    });

    describe('Existing User', () => {
      it('should lose game and increment lost game stats', () => {
        cy.mockUser();

        cy.visitApp();

        cy.mockBoard(incompleteGameDeck);

        cy.getStats().then((stats) => {
          cy.checkStatsAre(stats);

          cy.runGameWithClicks(incompleteGameMoves);

          cy.checkLostPage(true);

          cy.checkSummaryMoves(incompleteGameMoves.length);

          cy.confirmNewGame();

          cy.checkStatsAre(stats, [1, 0, 1, 0]);
        });
      });
    });
  });

  describe('Game Quit', () => {
    describe('New User', () => {
      it('should quit game and increment quit game stats', () => {
        cy.visitApp();

        cy.getStats().then((stats) => {
          cy.checkStatsAre(stats);

          cy.startNewGame();

          cy.checkStatsAre(stats, [1, 0, 0, 1]);
        });
      });
    });

    describe('Existing User', () => {
      it('should quit game and increment quit game stats', () => {
        cy.mockUser();

        cy.visitApp();

        cy.getStats().then((stats) => {
          cy.checkStatsAre(stats);

          cy.startNewGame();

          cy.checkStatsAre(stats, [1, 0, 0, 1]);
        });
      });
    });
  });
});
