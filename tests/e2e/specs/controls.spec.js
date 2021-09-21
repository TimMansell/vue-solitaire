import emptyColumnDeck from '../../fixtures/decks/quitGame.json';
import emptyColumnMoves from '../../fixtures/moves/quitGame.json';

describe('Controls', () => {
  beforeEach(() => {
    cy.mockApi({
      mockDeck: emptyColumnDeck,
      mockInitial: true,
      mockSaveGame: true,
      mockCreateUser: true,
      mockGetUser: true,
    });

    cy.visitApp();
  });

  afterEach(() => {
    cy.clearTest();
  });

  it('it should start a new game and reset board', () => {
    cy.runGameWithClicks(emptyColumnMoves);

    cy.clickCard('4♠');

    cy.startNewGame();

    cy.get('[data-test="foundation-1"]').shouldNotExist(['A♣']);

    cy.checkSelectedCard({ card: '4♠', isSelected: false });

    cy.get('[data-test="columns"]').within(() => {
      cy.get('[data-test="column-card-placeholder"]').should('not.exist');
    });
  });

  it('it should continue current game', () => {
    cy.runGameWithClicks(emptyColumnMoves);

    cy.clickCard('7♠');

    cy.newGame();

    cy.continueGame();

    cy.get('[data-test="foundation-0"]').shouldExist(['A♣']);

    cy.checkSelectedCard({ card: '7♠', isSelected: true });
  });

  it('it should new/continue, pause/resume, open/close: rules, history, stats, leaderboards', () => {
    cy.testContinueGame();

    cy.testPause();

    cy.testRules();

    cy.testHistory();

    cy.testStats();

    cy.testLeaderboards();
  });
});
