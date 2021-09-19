import incompleteGameDeck from '../../fixtures/decks/incompleteGame.json';
import incompleteGameMoves from '../../fixtures/moves/incompleteGame.json';
import noMovesKingColumnDeck from '../../fixtures/decks/noMovesKingColumn.json';
import noMovesKingColumnMoves from '../../fixtures/moves/noMovesKingColumn.json';
import initialAceMoveDeck from '../../fixtures/decks/initialAceMove.json';
import initialAceAnd2MoveDeck from '../../fixtures/decks/initialAceAnd2Move.json';
import { mockUid, mockNewUid } from '../../../src/mockData';

describe('No moves', () => {
  afterEach(() => {
    cy.clearTest();
  });

  describe('Variations', () => {
    it('should have K♣ as an available move then no moves after that', () => {
      cy.mockApi({
        mockDeck: noMovesKingColumnDeck,
        mockInitial: true,
        mockSaveGame: true,
        mockCreateUser: true,
        mockGetUser: true,
      });

      cy.visitApp();

      cy.runGameWithClicks(noMovesKingColumnMoves);

      cy.checkGameLost();
    });

    it('should have A♦ as an available foundation move then no moves after that', () => {
      cy.mockApi({
        mockDeck: initialAceMoveDeck,
        mockInitial: true,
        mockSaveGame: true,
        mockCreateUser: true,
        mockGetUser: true,
      });

      cy.visitApp();

      cy.clickFromTo('A♦', 'foundation-0');

      cy.checkGameLost();
    });

    it('should have 2♦ as an available foundation move then no moves after that', () => {
      cy.mockApi({
        mockDeck: initialAceAnd2MoveDeck,
        mockInitial: true,
        mockSaveGame: true,
        mockCreateUser: true,
        mockGetUser: true,
      });

      cy.visitApp();

      cy.clickFromTo('A♦', 'foundation-0');
      cy.clickFromTo('2♦', 'foundation-0');

      cy.checkGameLost();
    });
  });

  describe('New User', () => {
    it('should lose game, keep state on page refresh, and increment lost game stats', () => {
      cy.task('clearUser', mockNewUid);

      localStorage.setItem('luid', mockNewUid);

      cy.task('populateDeck', [incompleteGameDeck, mockNewUid]);

      cy.mockApi({
        mockDeck: incompleteGameDeck,
      });

      cy.visitApp();

      cy.saveStats();
      cy.saveGames();

      cy.runGameWithClicks(incompleteGameMoves);

      cy.checkGameLost();

      cy.testShowBoard();

      cy.checkReloadTimer();

      cy.checkGameLost();

      cy.confirmNewGame({ waitUser: true });

      cy.checkGameNumber(1);

      cy.showStats();

      cy.checkAllStats({ played: true, lost: true });
    });
  });

  describe('Existing User', () => {
    it('should lose game, keep state on page refresh, and increment lost game stats', () => {
      localStorage.setItem('luid', mockUid);

      cy.task('populateDeck', [incompleteGameDeck, mockUid]);

      cy.mockApi({
        mockDeck: incompleteGameDeck,
      });

      cy.visitApp();

      cy.saveStats();
      cy.saveGames();

      cy.runGameWithClicks(incompleteGameMoves);

      cy.checkGameLost();

      cy.testShowBoard();

      cy.checkReloadTimer();

      cy.checkGameLost();

      cy.confirmNewGame();

      cy.showStats();

      cy.checkAllStats({ played: true, lost: true });
    });
  });
});
