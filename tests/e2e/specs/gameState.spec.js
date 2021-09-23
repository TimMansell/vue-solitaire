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
    cy.setVisibilityHidden();

    cy.triggerVisibilityChange();

    cy.checkGamePaused(true);
  });

  it('refreshing page shows same board state', () => {
    cy.clickCard('4♠');

    cy.checkSelectedCard({ card: '4♠', isSelected: true });

    cy.reload();

    cy.checkSelectedCard({ card: '4♠', isSelected: true });

    cy.clickCard('4♠');

    cy.checkSelectedCard({ card: '4♠', isSelected: false });

    cy.checkCardPosition({ card: '4♣', column: 0, position: 6 });
    cy.checkCardPosition({ card: 'Q♣', column: 2, position: 4 });
    cy.checkCardPosition({ card: 'A♥', column: 5, position: 1 });
  });

  it('should show correct games, time, and moves on page refresh', () => {
    cy.runGameWithClicks(quitGameMoves);

    cy.saveGames();
    cy.saveTimer();
    cy.saveMoves();

    cy.reload();

    cy.checkGames();
    cy.checkTimer();
    cy.checkMoves();

    cy.pauseGame();

    cy.checkGameSummaryValues({ moves: 10 });
  });
});
