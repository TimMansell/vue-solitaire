const wait = 2000;
const waitSmall = 1000;

describe('Timer', () => {
  beforeEach(() => {
    cy.visitApp();

    cy.waitForTimerToStart();
  });

  afterEach(() => {
    cy.clearTest();
  });

  describe('Default Functionality', () => {
    it('it should increment timer correctly', () => {
      cy.wait(wait);

      cy.checkTimerIs(3);
    });

    it('it should increment timer correctly when pausing and resuming', () => {
      cy.pauseGame();

      cy.wait(waitSmall);

      cy.checkTimerIs(1);

      cy.resumeGame();

      cy.wait(wait);

      cy.checkTimerIs(3);
    });

    it('it should reset timer when a new game is started', () => {
      cy.startNewGame();

      cy.checkTimerHasReset();

      cy.wait(wait);

      cy.checkTimerIs(2);
    });

    it('timer should pause when page is automatically hidden', () => {
      cy.setVisibilityHidden();

      cy.triggerVisibilityChange();

      cy.wait(wait);

      cy.resumeGame();

      cy.checkTimerIs(3);
    });

    it('timer should pause/unpause if url is changed manually', () => {
      cy.visit('#/pause');

      cy.wait(waitSmall);

      cy.visit('#/');

      cy.wait(wait);

      cy.checkTimerIs(3);
    });

    it('timer should pause on 404 page', () => {
      cy.visit('#/abc');

      cy.wait(waitSmall);

      cy.goHome();

      cy.wait(wait);

      cy.checkTimerIs(3);
    });
  });

  describe('Refreshing page', () => {
    it('timer should continue from correct time when page is refreshed', () => {
      cy.wait(wait);

      cy.reload();

      cy.checkTimerIs(3);
    });

    it('timer should continue from correct time when game is paused and page is refreshed', () => {
      cy.pauseGame();

      cy.wait(waitSmall);

      cy.reload();

      cy.checkTimerIs(1);

      cy.resumeGame();

      cy.wait(wait);

      cy.checkTimerIs(3);
    });
  });
});
