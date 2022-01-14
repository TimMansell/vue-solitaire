import quitGameDeck from '../../fixtures/decks/quitGame.json';
import quitGameMoves from '../../fixtures/moves/quitGame.json';
import validMoveDeck from '../../fixtures/decks/validMove.json';

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

  it('should show correct time, and moves on game summary', () => {
    cy.setDeck(validMoveDeck).then(() => {
      cy.visitApp();
    });

    cy.dragCardFromTo('6♦', '7♦');

    cy.wait(2000);

    cy.pauseGame();

    cy.checkSummaryMoves(1);
    cy.checkSummaryTime('0:00:02');
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
