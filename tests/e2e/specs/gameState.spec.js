import quitGameDeck from '../../fixtures/decks/quitGame.json';
import quitGameMoves from '../../fixtures/moves/quitGame.json';
import validMoveDeck from '../../fixtures/decks/validMove.json';

describe('Game State', () => {
  beforeEach(() => {
    cy.visitApp();
  });

  afterEach(() => {
    cy.clearTest();
  });

  it('should pause when page is automatically hidden', () => {
    cy.setVisibilityHidden();

    cy.triggerVisibilityChange();

    cy.checkGameIsPaused(true);
  });

  it('should show correct time, and moves on game summary', () => {
    cy.setBoard(validMoveDeck);

    cy.dragCardFromTo('6♦', '7♦');

    cy.wait(2000);

    cy.pauseGame();

    cy.checkSummaryMoves(1);

    cy.checkSummaryTime('0:00:03');
  });

  it('refreshing page shows same board state', () => {
    cy.setBoard(quitGameDeck);

    cy.clickCard('4♠');

    cy.checkCardIsSelected('4♠');

    cy.reload();

    cy.checkCardIsSelected('4♠');

    cy.clickCard('4♠');

    cy.checkCardIsNotSelected();

    cy.checkCardPositions([
      { card: '4♣', column: 0, position: 6 },
      { card: 'Q♣', column: 2, position: 4 },
      { card: 'A♥', column: 5, position: 1 },
    ]);
  });

  it('should show correct games, time, and moves on page refresh', () => {
    cy.setBoard(quitGameDeck);

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
