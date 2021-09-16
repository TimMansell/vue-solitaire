import quitGameDeck from '../../fixtures/decks/quitGame.json';
import quitGameMoves from '../../fixtures/moves/quitGame.json';

describe('Controls', () => {
  afterEach(() => {
    cy.clearTest();
  });

  it('it should start a new game and reset board', () => {
    cy.visitApp({ mockDeck: quitGameDeck });

    cy.runGameWithClicks(quitGameMoves);

    cy.get('[data-test="card-7♠"]').click();

    cy.startNewGame();

    cy.wait('@waitForCreateUserAPI');

    cy.get('[data-test="foundation-0"]').shouldNotContain(['A♣']);

    cy.get('[data-card-selected="true"]').should('not.exist');
  });

  it('it should continue current game', () => {
    cy.visitApp({ mockDeck: quitGameDeck });

    cy.runGameWithClicks(quitGameMoves);

    cy.get('[data-test="card-7♠"]').click();

    cy.newGame();

    cy.continueGame();

    cy.get('[data-test="foundation-0"]').shouldContain(['A♣']);

    cy.get('[data-test="card-7♠"]').should('have.class', 'card--is-selected');
  });

  it('it should pause/resume, open/close rules, open/close history, open/close stats, open/close leaderboards', () => {
    cy.visitApp();

    cy.testPause();

    cy.testRules();

    cy.testHistory();

    cy.testStats();

    cy.testLeaderboards();
  });

  it('it should show correct summary on game overlay', () => {
    cy.visitApp({ mockDeck: quitGameDeck });

    cy.runGameWithClicks(quitGameMoves);

    cy.pauseGame();

    cy.checkGameSummaryValues({ moves: 10 });
  });
});
