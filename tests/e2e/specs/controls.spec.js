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

    cy.get('[data-test="card-4♠"]').click();

    cy.startNewGame();

    cy.get('[data-test="foundation-1"]').shouldNotContain(['A♣']);

    cy.get('[data-card-selected="true"]').should('not.exist');

    cy.get('[data-test="columns"]').within(() => {
      cy.get('[data-test="column-card-placeholder"]').should('not.exist');
    });
  });

  it('it should continue current game', () => {
    cy.runGameWithClicks(emptyColumnMoves);

    cy.get('[data-test="card-7♠"]').click();

    cy.newGame();

    cy.continueGame();

    cy.get('[data-test="foundation-0"]').shouldContain(['A♣']);

    cy.get('[data-test="card-7♠"]').should('have.class', 'card--is-selected');
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
