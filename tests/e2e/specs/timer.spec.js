const wait = 2000;
const waitSmall = 1000;

describe('Timer', () => {
  beforeEach(() => {
    cy.visitApp();
  });

  describe('Default Functionality', () => {
    it('it should increment timer correctly when pausing and resuming', () => {
      cy.wait(wait);

      cy.checkTimerIs(2);

      cy.pauseGame();

      cy.wait(waitSmall);

      cy.checkTimerIs(2);

      cy.resumeGame();

      cy.wait(wait);

      cy.checkTimerIs(4);
    });

    it('it should reset timer when a new game is started', () => {
      cy.wait(waitSmall);

      cy.startNewGame();

      cy.checkTimerHasReset();

      cy.wait(wait);

      cy.checkTimerIs(2);
    });

    it('timer should pause when page is automatically hidden', () => {
      cy.wait(waitSmall);

      cy.setVisibilityHidden();

      cy.triggerVisibilityChange();

      cy.wait(wait);

      cy.resumeGame();

      cy.checkTimerIs(3);
    });

    it('timer should pause/unpause if url is changed manually', () => {
      cy.wait(waitSmall);

      cy.visit('#/pause');

      cy.wait(waitSmall);

      cy.visit('#/');

      cy.wait(wait);

      cy.checkTimerIs(3);
    });

    it('timer should pause on 404 page', () => {
      cy.wait(waitSmall);

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

      cy.checkTimerIs(2);
    });

    it('timer should continue from correct time when game is paused and page is refreshed', () => {
      cy.wait(waitSmall);

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
