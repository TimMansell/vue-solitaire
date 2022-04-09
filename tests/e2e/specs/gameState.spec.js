import quitGameDeck from '../../fixtures/decks/quitGame.json';
import quitGameMoves from '../../fixtures/moves/quitGame.json';

describe('Game State', () => {
  beforeEach(() => {
    cy.visitApp();
  });

  afterEach(() => cy.cleanUp());

  it('it should start a new game using deck from server', () => {
    cy.mockBoard(quitGameDeck);

    cy.checkBoardIs(quitGameDeck);

    cy.reload();

    cy.checkBoardIs(quitGameDeck);
  });

  it('should use same deck if localStorage is cleared', () => {
    cy.mockBoard(quitGameDeck);

    cy.mockPaused(true);

    cy.clearLocalStorage('vuex');

    cy.reload();

    cy.checkBoardIs(quitGameDeck);
  });

  it('it should start a new game and reset board', () => {
    cy.mockBoard(quitGameDeck);

    cy.runGameWithClicks(quitGameMoves);

    cy.clickCard('4♠');

    cy.startNewGame();

    cy.checkCardsNotExistOn(['A♣'], 'foundation-0');

    cy.checkCardIsNotSelected();

    cy.checkPlaceholderCardExists(false);

    cy.checkBoardIsNot(quitGameDeck);
  });

  it('should keep board state when refreshing page', () => {
    cy.mockBoard(quitGameDeck);

    cy.runGameWithClicks(quitGameMoves);

    cy.clickCard('4♠');

    cy.reload();

    cy.checkCardsExistOn(['A♣'], 'foundation-0');

    cy.checkCardIsSelected('4♠');

    cy.testContinueGame();

    cy.testPause();

    cy.testRules();

    cy.testHistory();

    cy.testStats();

    cy.testLeaderboards();

    cy.checkCardsExistOn(['A♣'], 'foundation-0');

    cy.clickCard('4♠');

    cy.checkCardIsNotSelected();

    cy.checkBoardIsNot(quitGameDeck);
  });
});
