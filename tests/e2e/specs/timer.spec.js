describe('Timer', () => {
  beforeEach(() => {
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
      cy.wait(2000);

      cy.checkTimerIs('0:00:03');
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

      cy.wait(1000);

      cy.resumeGame();

      cy.wait(2000);

      cy.checkTimerIs('0:00:03');
    });

    it('timer should pause when page is automatically hidden', () => {
      cy.setVisibilityHidden();

      cy.triggerVisibilityChange();

      cy.wait(2000);

      cy.resumeGame();

      cy.checkTimerIs('0:00:03');
    });

    it('timer should pause/unpause if url is changed manually', () => {
      cy.saveTimer();

      cy.visit('#/pause');

      cy.saveTimer({ wait: 2000 });

      cy.checkTimerIsPaused();

      cy.visit('#/');

      cy.wait(2000);

      cy.checkTimerIs('0:00:02');
    });

    it('timer should pause on 404 page', () => {
      cy.visit('#/abc');

      cy.wait(2000);

      cy.goHome();

      cy.checkTimerIs('0:00:00');
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
      cy.wait(1000);

      cy.startNewGame();

      cy.checkTimerHasReset();
    });
  });
});
