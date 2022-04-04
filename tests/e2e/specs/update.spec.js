describe('Update', () => {
  describe('Default', () => {
    beforeEach(() => {
      cy.visitApp();
    });

    it('it should not update up to latest version', () => {
      cy.checkUpdatedAlertVisible(false);
    });

    it('it should not allow user to leave update page by changing url', () => {
      cy.mockVersionUpdate();

      cy.visit('#/');

      cy.wait(1000);

      cy.visit('#/pause');

      cy.url().should('include', '#/update');
    });

    it('it should not allow user to go to update page', () => {
      cy.visit('#/update');

      cy.url().should('not.include', '#/update');
    });
  });

  describe('New Version', () => {
    beforeEach(() => {
      cy.visitApp();
    });

    it('it should show update for an older version and update to latest version on page reload', () => {
      cy.mockVersionUpdate();

      cy.checkUpdatePage(true);

      cy.reload();

      cy.checkUpdatePage(false);

      cy.checkUpdatedAlert();
    });

    it('it should show update for an older version and update to latest version when update button is pressed', () => {
      cy.mockVersionUpdate();

      cy.checkUpdatePage(true);

      cy.update();

      cy.checkUpdatePage(false);

      cy.checkUpdatedAlert();
    });
  });

  describe('Legacy User', () => {
    it('it should update a legacy user (vuex) to latest version', () => {
      cy.mockVersion('vuex');

      cy.visitApp();

      cy.checkHasUpdated();

      cy.checkUpdatedAlert();
    });
  });
});
