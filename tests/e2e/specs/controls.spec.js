import quitGameDeck from '../../fixtures/decks/quitGame.json';
import quitGameMoves from '../../fixtures/moves/quitGame.json';

describe('Controls', () => {
  beforeEach(() => {
    cy.visitApp({
      mockDeck: quitGameDeck,
      mockInitialApi: true,
      mockApi: true,
    });
  });

  afterEach(() => {
    cy.clearTest();
  });

  it('it should start a new game and reset board', () => {
    cy.runGameWithClicks(quitGameMoves);

    cy.get('[data-test="card-7♠"]').click();

    cy.startNewGame();

    cy.get('[data-test="foundation-0"]').shouldNotContain(['A♣']);

    cy.get('[data-card-selected="true"]').should('not.exist');
  });

  it('it should continue current game', () => {
    cy.runGameWithClicks(quitGameMoves);

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
