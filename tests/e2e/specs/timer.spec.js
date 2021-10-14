const wait = 2000;

describe('Timer', () => {
  beforeEach(() => {
    cy.visitApp();

    cy.waitForTimerToStart();
  });

  afterEach(() => {
    cy.clearTest();
  });

  describe('Default Functionality', () => {
    it('timer stops when game is paused and starts when resumed', () => {
      cy.saveTimer();

      cy.pauseGame();

      cy.saveTimer({ wait });

      cy.resumeGame();

      cy.saveTimer({ wait });

      cy.checkTimerHasResumed();
    });

    it('it should increment timer correctly', () => {
      cy.wait(wait);

      cy.checkTimerIs('0:00:03');
    });

    it('it should pause timer after new game then pause game', () => {
      cy.startNewGame();

      cy.pauseGame();

      cy.saveTimer({ wait });

      cy.saveTimer({ wait });

      cy.checkTimerIsPaused();
    });

    it('it should increment timer correctly after pausing', () => {
      cy.pauseGame();

      cy.wait(wait);

      cy.resumeGame();

      cy.wait(wait);

      cy.checkTimerIs('0:00:03');
    });

    it('timer should pause when page is automatically hidden', () => {
      cy.setVisibilityHidden();

      cy.triggerVisibilityChange();

      cy.wait(wait);

      cy.resumeGame();

      cy.checkTimerIs('0:00:03');
    });

    it('timer should pause/unpause if url is changed manually', () => {
      cy.saveTimer();

      cy.visit('#/pause');

      cy.saveTimer({ wait });

      cy.checkTimerIsPaused();

      cy.visit('#/');

      cy.wait(wait);

      cy.checkTimerIs('0:00:03');
    });

    it('timer should pause on 404 page', () => {
      cy.visit('#/abc');

      cy.wait(wait);

      cy.goHome();

      cy.checkTimerIs('0:00:01');
    });
  });

  describe('Refreshing page', () => {
    it('timer should continue when page is refreshed', () => {
      cy.reload();

      cy.saveTimer({ wait });

      cy.checkTimerIs('0:00:03');
    });

    it('timer should start paused when game is paused and page is refreshed', () => {
      cy.saveTimer();

      cy.pauseGame();

      cy.reload();

      cy.saveTimer({ wait });

      cy.checkTimerIsPaused();
    });

    it('timer should start paused when stats overlay is open and page is refreshed', () => {
      cy.saveTimer();

      cy.showStats();

      cy.reload();

      cy.saveTimer({ wait });

      cy.checkTimerIsPaused();
    });

    it('timer should start paused when how to play overlay is open and page is refreshed', () => {
      cy.saveTimer();

      cy.showRules();

      cy.reload();

      cy.saveTimer({ wait });

      cy.checkTimerIsPaused();
    });

    it('timer should start paused when new game overlay is open and page is refreshed', () => {
      cy.saveTimer();

      cy.newGame();

      cy.reload();

      cy.saveTimer({ wait });

      cy.checkTimerIsPaused();
    });
  });

  describe('Resuming Timer', () => {
    it('timer stops when stats overlay is open and starts when resumed', () => {
      cy.saveTimer();

      cy.showStats();

      cy.saveTimer({ wait });

      cy.closeOverlay();

      cy.saveTimer({ wait });

      cy.checkTimerHasResumed();
    });

    it('timer stops when new game overlay is open and starts when resumed', () => {
      cy.saveTimer();

      cy.newGame();

      cy.saveTimer({ wait });

      cy.continueGame();

      cy.saveTimer({ wait });

      cy.checkTimerHasResumed();
    });
  });

  describe('Resetting timer', () => {
    it('it should reset timer when new game is pressed', () => {
      cy.wait(1000);

      cy.startNewGame();

      cy.checkTimerHasReset();
    });
  });
});
