const wait = 2;
const waitSmall = 1;

describe('Timer', () => {
  beforeEach(() => {
    cy.visitApp();
  });

  afterEach(() => cy.cleanUp());

  describe('Default Functionality', () => {
    it('it should increment timer correctly when pausing and resuming', () => {
      cy.waitSeconds(wait);

      cy.checkTimerIs(2);

      cy.pauseGame();

      cy.waitSeconds(waitSmall);

      cy.checkTimerIs(2);

      cy.resumeGame();

      cy.waitSeconds(wait);

      cy.checkTimerIs(4);
    });

    it('it should reset timer when a new game is started', () => {
      cy.waitSeconds(waitSmall);

      cy.startNewGame();

      cy.checkTimerHasReset();

      cy.waitSeconds(wait);

      cy.checkTimerIs(2);
    });

    it('timer should pause when page is automatically hidden', () => {
      cy.waitSeconds(waitSmall);

      cy.setVisibilityHidden();

      cy.triggerVisibilityChange();

      cy.waitSeconds(wait);

      cy.resumeGame();

      cy.checkTimerIs(3);
    });

    it('timer should pause/unpause if url is changed manually', () => {
      cy.waitSeconds(waitSmall);

      cy.visit('/pause');

      cy.waitSeconds(waitSmall);

      cy.visit('/');

      cy.waitSeconds(wait);

      cy.checkTimerIs(3);
    });

    it('timer should pause on 404 page', () => {
      cy.waitSeconds(waitSmall);

      cy.visit('/abc');

      cy.waitSeconds(waitSmall);

      cy.goHome();

      cy.waitSeconds(wait);

      cy.checkTimerIs(3);
    });
  });

  describe('Refreshing page', () => {
    it('timer should continue from correct time when page is refreshed', () => {
      cy.waitSeconds(wait);

      cy.reload();

      cy.checkTimerIs(2);
    });

    it('timer should continue from correct time when game is paused and page is refreshed', () => {
      cy.waitSeconds(waitSmall);

      cy.pauseGame();

      cy.waitSeconds(waitSmall);

      cy.reload();

      cy.checkTimerIs(1);

      cy.resumeGame();

      cy.waitSeconds(wait);

      cy.checkTimerIs(3);
    });
  });
});
