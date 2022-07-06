describe('Update', () => {
  afterEach(() => {
    cy.cleanUp();
    cy.mockVersion(false);
  });

  describe('Default', () => {
    beforeEach(() => {
      cy.visitApp();
    });

    it('it should not update up to latest version', () => {
      cy.checkUpdatedAlertVisible(false);
    });

    it('it should not allow user to go to update page', () => {
      cy.visit('/update');

      cy.url().should('not.include', '/update');
    });
  });

  describe('New Version', () => {
    beforeEach(() => {
      cy.visitApp();
    });

    it('it should show update for an older version and update to latest version on page reload', () => {
      cy.mockLocalVersion();

      cy.mockVersion(true);

      cy.checkUpdatePage(true);

      cy.mockVersion(false);

      cy.reload();

      cy.checkUpdatePage(false);

      cy.checkUpdatedAlert();
    });

    it('it should show update for an older version and update to latest version when update button is pressed', () => {
      cy.mockLocalVersion();

      cy.mockVersion(true);

      cy.checkUpdatePage(true);

      cy.mockVersion(false);

      cy.update();

      cy.checkUpdatePage(false);

      cy.checkUpdatedAlert();
    });
  });

  describe('Legacy User', () => {
    it('it should update a legacy user (vuex) to latest version', () => {
      cy.mockLegacyVersion();

      cy.visitApp();

      cy.checkHasUpdated();

      cy.checkUpdatedAlert();
    });
  });

  describe('Edge cases', () => {
    it('it should handle where user has latest version but there is a new version release just after they load website', () => {
      cy.mockVersion(true).then(() => {
        cy.visitApp();

        cy.checkUpdatePage(true);
      });
    });
  });
});
