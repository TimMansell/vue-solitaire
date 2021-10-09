import quitGameDeck from '../../fixtures/decks/quitGame.json';
import quitGameMoves from '../../fixtures/moves/quitGame.json';

describe('Game State', () => {
  afterEach(() => {
    cy.clearTest();
  });

  it('should pause when page is automatically hidden', () => {
    cy.visitApp();

    cy.setVisibilityHidden();

    cy.triggerVisibilityChange();

    cy.checkGameIsPaused(true);
  });

  it('refreshing page shows same board state', () => {
    cy.setDeck(quitGameDeck).then(() => {
      cy.visitApp();
    });

    cy.clickCard('4♠');

    cy.checkCardIsSelected('4♠');

    cy.reload();

    cy.checkCardIsSelected('4♠');

    cy.clickCard('4♠');

    cy.checkCardIsNotSelected('4♠');

    cy.checkCardPositions([
      { card: '4♣', column: 0, position: 6 },
      { card: 'Q♣', column: 2, position: 4 },
      { card: 'A♥', column: 5, position: 1 },
    ]);
  });

  it('should show correct games, time, and moves on page refresh', () => {
    cy.setDeck(quitGameDeck).then(() => {
      cy.visitApp();
    });

    cy.runGameWithClicks(quitGameMoves);

    cy.saveGames();
    cy.saveTimer();
    cy.saveMoves();

    cy.reload();

    cy.checkGames();
    cy.checkTimer();
    cy.checkMoves();

    cy.pauseGame();

    cy.checkGameSummary();
  });
});
