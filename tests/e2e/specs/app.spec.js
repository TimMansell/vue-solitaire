describe('App', () => {
  beforeEach(() => {
    cy.visitApp();
  });

  afterEach(() => cy.cleanUp());

  describe('Default', () => {
    it('it successfully loads', () => {
      cy.checkBoardLayout();

      cy.checkFoundationLayout();

      cy.getStats().then(({ user, global }) => {
        const [completed] = user;
        const [completedGlobal] = global;

        cy.checkGameCount(completed);
        cy.checkGlobalGameCount(completedGlobal);
      });

      cy.getPlayerCount().then((count) => cy.checkPlayerCountIs(count));

      cy.checkOnlinePlayerCount();
    });

    it('should pause when page is automatically hidden', () => {
      cy.setVisibilityHidden();

      cy.triggerVisibilityChange();

      cy.checkPausedPage(true);

      cy.checkBodyOverflow(true);
    });

    it('show pause page if url is changed manually', () => {
      cy.visit('/pause');

      cy.checkPausedPage(true);

      cy.resumeGame();

      cy.checkPausedPage(false);
    });

    it('it should show 404 page', () => {
      cy.visit('/abc');

      cy.check404Page(true);

      cy.goHome();

      cy.check404Page(false);
    });

    it('should not show game paused if overlay is visible', () => {
      cy.setVisibilityHidden();

      cy.showRules();

      cy.triggerVisibilityChange();

      cy.checkPausedPage(false);
    });
  });

  describe('Offline', () => {
    it('it should show alert if offline and then hide once online', () => {
      cy.checkConnectedAlert();

      cy.mockIsOnline(false);

      cy.checkConnectionPage(true);

      cy.mockIsOnline(true);

      cy.checkConnectionPage(false);

      cy.checkConnectedAlert();
    });

    it('it should show alert if offline and then hide when page is reloaded', () => {
      cy.checkConnectedAlert();

      cy.mockIsOnline(false);

      cy.checkConnectionPage(true);

      cy.reload();

      cy.checkConnectionPage(false);

      cy.checkConnectedAlert();
    });

    it('it should show alert if offline and then hide when reconnect button is clicked', () => {
      cy.checkConnectedAlert();

      cy.mockIsOnline(false);

      cy.checkConnectionPage(true);

      cy.reconnect();

      cy.checkConnectionPage(false);

      cy.checkConnectedAlert();
    });

    it('it should not allow loading of connection error page if connected', () => {
      cy.checkConnectedAlert();

      cy.visit('/connection-error');

      cy.checkConnectionPage(false);
    });
  });
});
