describe('App', () => {
   afterEach(() => {
    cy.clearTest();
  });

  describe('Default', () => {
    beforeEach(() => {
      cy.visitApp();
    });

    it('it successfullly loads', () => {
      cy.get('[data-test="board"]').should('be.visible');

      cy.get('[data-test="columns"]').within(() => {
        cy.get('[data-test^="card-"]').should('have.length', 52);
      });

      cy.get('[data-test="foundations"]').within(() => {
        cy.get('[data-test^="foundation-"]').should('have.length', 4);
      });
    });

    it('it should hide scroll bar when overlay is open and show scrollbar when overlay is closed', () => {
      cy.get('[data-test="pause-game-btn"]').click();

      cy.get('[data-test="body"]').should('have.css', 'overflow', 'hidden');

      cy.get('[data-test="game-overlay-btns"]').within(() => {
        cy.get('[data-test="pause-game-btn"]').click();
      });

      cy.get('[data-test="body"]').should('have.css', 'overflow', 'auto');
    });
  });

  describe('Version', () => {
    it('it should not show version upgrade toast', () => {
      cy.interceptVersionAPI({ matches: true });

      cy.visit('/');

      cy.wait('@waitForVersionAPI');

      cy.get('[data-test="version"]').should('not.exist');
    });

    it('it should show version upgrade toast', () => {
      cy.interceptVersionAPI({ matches: false });

      cy.visit('/');

      cy.wait('@waitForVersionAPI');

      cy.get('[data-test="version"]').should('exist');
    });

    it('it should show version upgrade toast and not show it after page reload', () => {
      cy.interceptVersionAPI({ matches: false });

      cy.visit('/');

      cy.wait('@waitForVersionAPI');

      cy.get('[data-test="version"]').should('exist');

      cy.interceptVersionAPI({ matches: true });

      cy.reloadAndWait();

      cy.wait('@waitForVersionAPI');

      cy.get('[data-test="version"]').should('not.exist');
    });
  });
});
