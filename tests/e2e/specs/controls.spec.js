import quitGameDeck from '../../fixtures/decks/quitGame.json';
import quitGameMoves from '../../fixtures/moves/quitGame.json';

describe('Controls', () => {
  beforeEach(() => {
    // cy.visitApp();
  });

  afterEach(() => {
    cy.clearTest();
  });

  it('it should start a new game and reset board', () => {
    cy.visitApp({ mockDeck: quitGameDeck });

    cy.runGameWithClicks(quitGameMoves);

    cy.get('[data-test="card-7♠"]').click();

    cy.startNewGame();

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

  it('it should open and close rules', () => {
    cy.visitApp();

    cy.showRules();

    cy.get('[data-test="rules-overlay"]').should('be.visible');

    cy.closeOverlay();

    cy.get('[data-test="rules-overlay"]').should('not.exist');
  });

  it('it should open and close history', () => {
    cy.visitApp();

    cy.showHistory();

    cy.get('[data-test="history-overlay"]').should('exist');

    cy.closeOverlay();

    cy.get('[data-test="history-overlay"]').should('not.exist');
  });

  it('it should pause a game and show game paused overlay', () => {
    cy.visitApp();

    cy.pauseGame();

    cy.get('[data-test="game-paused"]').should('be.visible');

    cy.resumeGame();

    cy.get('[data-test="game-paused"]').should('not.exist');
  });

  it('it should show correct summary on game overlay', () => {
    cy.visitApp({ mockDeck: quitGameDeck });

    cy.runGameWithClicks(quitGameMoves);

    cy.pauseGame();

    cy.checkGameSummaryValues({ moves: 10 });
  });
});
