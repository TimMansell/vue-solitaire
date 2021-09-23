import fullGameDeck from '../../fixtures/decks/fullGame.json';

describe('Timer', () => {
  beforeEach(() => {
    cy.mockApi({
      mockDeck: fullGameDeck,
      mockInitial: true,
    });

    cy.visitApp();
  });

  afterEach(() => {
    cy.clearTest();
  });

  describe('Default Functionality', () => {
    it('timer stops when game is paused and starts when resumed', () => {
      cy.saveTimer();

      cy.pauseGame();

      cy.saveTimer({ wait: 1000 });

      cy.resumeGame();

      cy.saveTimer({ wait: 1000 });

      cy.checkTimerHasResumed();
    });

    it('it should increment timer correctly', () => {
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(2000);

      cy.get('[data-test="timer"]').should('contain', '0:00:03');
    });

    it('it should pause timer after new game then pause game', () => {
      cy.startNewGame();

      cy.pauseGame();

      cy.saveTimer({ wait: 1000 });

      cy.saveTimer({ wait: 1000 });

      cy.checkTimerIsPaused();
    });

    it('it should increment timer correctly after pausing', () => {
      cy.pauseGame();

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000);

      cy.resumeGame();

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(2000);

      cy.get('[data-test="timer"]').should('contain', '0:00:03');
    });

    it('timer should pause when page is automatically hidden', () => {
      cy.setVisibilityHidden();

      cy.triggerVisibilityChange();

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(2000);

      cy.resumeGame();

      cy.get('[data-test="timer"]').should('contain', '0:00:03');
    });
  });

  describe('Refreshing page', () => {
    it('timer should start paused when game is paused and page is refreshed', () => {
      cy.saveTimer();

      cy.pauseGame();

      cy.reload();

      cy.saveTimer({ wait: 2000 });

      cy.checkTimerIsPaused();
    });

    it('timer should start paused when stats overlay is open and page is refreshed', () => {
      cy.saveTimer();

      cy.showStats();

      cy.reload();

      cy.saveTimer({ wait: 2000 });

      cy.checkTimerIsPaused();
    });

    it('timer should start paused when how to play overlay is open and page is refreshed', () => {
      cy.saveTimer();

      cy.showRules();

      cy.reload();

      cy.saveTimer({ wait: 2000 });

      cy.checkTimerIsPaused();
    });

    it('timer should start paused when new game overlay is open and page is refreshed', () => {
      cy.saveTimer();

      cy.newGame();

      cy.reload();

      cy.saveTimer({ wait: 2000 });

      cy.checkTimerIsPaused();
    });
  });

  describe('Resuming Timer', () => {
    it('timer stops when stats overlay is open and starts when resumed', () => {
      cy.saveTimer();

      cy.showStats();

      cy.saveTimer({ wait: 1000 });

      cy.closeOverlay();

      cy.saveTimer({ wait: 1000 });

      cy.checkTimerHasResumed();
    });

    it('timer stops when new game overlay is open and starts when resumed', () => {
      cy.saveTimer();

      cy.newGame();

      cy.saveTimer({ wait: 1000 });

      cy.continueGame();

      cy.saveTimer({ wait: 1000 });

      cy.checkTimerHasResumed();
    });
  });

  describe('Resetting timer', () => {
    it('it should reset timer when new game is pressed', () => {
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000);

      cy.startNewGame();

      cy.checkTimerHasReset();
    });
  });
});
