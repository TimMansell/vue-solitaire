import emptyColumnDeck from '../../fixtures/decks/quitGame.json';
import emptyColumnMoves from '../../fixtures/moves/quitGame.json';

describe('Controls', () => {
  afterEach(() => {
    cy.clearTest();
  });

  it('it should start a new game and reset board', () => {
    cy.setDeck(emptyColumnDeck).then(() => {
      cy.visitApp();
    });

    cy.runGameWithClicks(emptyColumnMoves);

    cy.clickCard('4♠');

    cy.startNewGame();

    cy.checkCardsNotExistOn(['A♣'], 'foundation-1');

    cy.checkCardIsNotSelected('4♠');

    cy.checkPlaceholderCardExists(false);
  });

  it('it should continue current game', () => {
    cy.setDeck(emptyColumnDeck).then(() => {
      cy.visitApp();
    });

    cy.runGameWithClicks(emptyColumnMoves);

    cy.clickCard('7♠');

    cy.newGame();

    cy.continueGame();

    cy.checkCardsExistOn(['A♣'], 'foundation-0');

    cy.checkCardIsSelected('7♠');
  });

  it('it should new/continue, pause/resume, open/close rules, history, stats, leaderboards', () => {
    cy.visitApp();

    cy.testContinueGame();

    cy.testPause();

    cy.testRules();

    cy.testHistory();

    cy.testStats();

    cy.testLeaderboards();
  });
});
