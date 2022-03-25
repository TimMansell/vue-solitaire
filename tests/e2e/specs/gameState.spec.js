import quitGameDeck from '../../fixtures/decks/quitGame.json';
import quitGameMoves from '../../fixtures/moves/quitGame.json';

describe('Game State', () => {
  beforeEach(() => {
    cy.visitApp();
  });

  it('it should start a new game and reset board', () => {
    cy.setBoard(quitGameDeck);

    cy.runGameWithClicks(quitGameMoves);

    cy.clickCard('4♠');

    cy.startNewGame();

    cy.checkCardsNotExistOn(['A♣'], 'foundation-1');

    cy.checkCardIsNotSelected();

    cy.checkPlaceholderCardExists(false);
  });

  it('should pause when page is automatically hidden', () => {
    cy.setVisibilityHidden();

    cy.triggerVisibilityChange();

    cy.checkGameIsPaused(true);

    cy.checkSummaryMoves(1);
  });

  it('should not show game paused if overlay is visible', () => {
    cy.setVisibilityHidden();

    cy.showRules();

    cy.triggerVisibilityChange();

    cy.checkGameIsPaused(false);
  });

  it('it should new/continue, pause/resume, open/close: rules, history, stats and leaderboards', () => {
    const [firstMove] = quitGameMoves;

    cy.setBoard(quitGameDeck);

    cy.runGameWithClicks([firstMove]);

    cy.clickCard('4♠');

    cy.checkCardIsSelected('4♠');

    cy.testContinueGame();

    cy.testPause();

    cy.testRules();

    cy.testHistory();

    cy.testStats();

    cy.testLeaderboards();

    cy.checkCardIsSelected('4♠');
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
});
