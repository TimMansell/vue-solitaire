import quitGameDeck from '../../fixtures/decks/quitGame.json';
import quitGameMoves from '../../fixtures/moves/quitGame.json';

describe('Game State', () => {
  beforeEach(() => {
    cy.mockApi({
      mockDeck: quitGameDeck,
      mockInitial: true,
    });

    cy.visitApp();
  });

  afterEach(() => {
    cy.clearTest();
  });

  it('should pause when page is automatically hidden', () => {
    cy.document().then((doc) => {
      cy.stub(doc, 'visibilityState').value('hidden');
    });

    cy.document().trigger('visibilitychange');

    cy.get('[data-test="game-paused"]').should('be.visible');
  });

  it('refreshing page shows same board state', () => {
    cy.get('[data-test^="card-4♠"]').click();

    cy.checkSelectedCard({ card: '4♠', isSelected: true });

    cy.reload();

    cy.checkSelectedCard({ card: '4♠', isSelected: true });

    cy.get('[data-test^="card-4♠"]').click();

    cy.checkSelectedCard({ card: '4♠', isSelected: false });

    cy.checkCard({ card: '4♣', column: 0, position: 6 });
    cy.checkCard({ card: 'Q♣', column: 2, position: 4 });
    cy.checkCard({ card: 'A♥', column: 5, position: 1 });
  });

  it('should show correct games, time, and moves on page refresh', () => {
    cy.runGameWithClicks(quitGameMoves);

    cy.saveGames();
    cy.saveTimer({ alias: 'timer' });
    cy.saveMoves();

    cy.reload();

    cy.checkGames();
    cy.checkTimer();
    cy.checkMoves();

    cy.pauseGame();

    cy.checkGameSummaryValues({ moves: 10 });
  });
});
