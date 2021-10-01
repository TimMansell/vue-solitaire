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
    it('should have K♣ as an available move then no moves after that', () => {
      cy.mockApi({
        mockDeck: noMovesKingColumnDeck,
        mockInitial: true,
      });

      cy.visitApp();

      cy.runGameWithClicks(noMovesKingColumnMoves);

      cy.checkGameLost(true);
    });

    it('should have A♦ as an available foundation move then no moves after that', () => {
      cy.mockApi({
        mockDeck: initialAceMoveDeck,
        mockInitial: true,
      });

      cy.visitApp();

      cy.clickFromTo('A♦', 'foundation-0');

      cy.checkGameLost(true);
    });

    it('should have 2♦ as an available foundation move then no moves after that', () => {
      cy.mockApi({
        mockDeck: initialAceAnd2MoveDeck,
        mockInitial: true,
      });

      cy.visitApp();

      cy.clickFromTo('A♦', 'foundation-0');
      cy.clickFromTo('2♦', 'foundation-0');

      cy.checkGameLost(true);
    });
  });

  describe('New User', () => {
    beforeEach(() => {
      cy.mockApi({
        mockDeck: incompleteGameDeck,
      });

      cy.visitApp();

      cy.setDeck(incompleteGameDeck);
    });

    it('should lose game, keep state on page refresh, and increment lost game stats', () => {
      cy.runGameWithClicks(incompleteGameMoves);

      cy.checkGameLost(true);

      cy.testShowBoard();

      cy.checkTimerIsPausedOnReload();

      cy.checkGameLost(true);

      cy.confirmNewGame({ waitUser: true });

      cy.checkStats();
    });
  });

  describe('Existing User', () => {
    beforeEach(() => {
      cy.setUser(mockUid);

      cy.mockApi({
        mockDeck: incompleteGameDeck,
      });

      cy.visitApp();

      cy.setDeck(incompleteGameDeck);
    });

    it('should lose game, keep state on page refresh, and increment lost game stats', () => {
      cy.runGameWithClicks(incompleteGameMoves);

      cy.checkGameLost(true);

      cy.testShowBoard();

      cy.checkTimerIsPausedOnReload();

      cy.checkGameLost(true);

      cy.confirmNewGame();

      cy.checkStats();
    });
  });
});
