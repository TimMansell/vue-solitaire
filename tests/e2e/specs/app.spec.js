import fullGameDeck from '../../fixtures/decks/fullGame.json';

describe('App', () => {
  afterEach(() => {
    cy.clearTest();
  });

  describe('Default', () => {
    beforeEach(() => {
      cy.visitApp();
    });

    it('it successfully loads', () => {
      cy.get('[data-test="board"]').should('be.visible');

      cy.get('[data-test="columns"]').within(() => {
        cy.get('[data-test^="card-"]').should('have.length', 52);
      });

      cy.get('[data-test="foundations"]').within(() => {
        cy.get('[data-test^="foundation-"]').should('have.length', 4);
      });
    });

    it('it should hide scroll bar when overlay is open and show scrollbar when overlay is closed', () => {
      cy.pauseGame();

      cy.get('[data-test="body"]').should('have.css', 'overflow', 'hidden');

      cy.resumeGame();

      cy.get('[data-test="body"]').should('have.css', 'overflow', 'auto');
    });
  });

  describe('Version', () => {
    it('it should not show version upgrade toast', () => {
      cy.mockApi({
        mockDeck: fullGameDeck,
        mockInitial: {
          matchesVersion: true,
        },
      });

      cy.visitApp();

      cy.get('[data-test="version"]').should('not.exist');
    });

    it('it should show version upgrade toast', () => {
      cy.mockApi({
        mockDeck: fullGameDeck,
        mockInitial: {
          matchesVersion: false,
        },
      });

      cy.visitApp();

      cy.get('[data-test="version"]').should('exist');
    });

    it('it should show version upgrade toast and not show it after page reload', () => {
      cy.mockApi({
        mockDeck: fullGameDeck,
        mockInitial: {
          matchesVersion: false,
        },
      });

      cy.visitApp();

      cy.get('[data-test="version"]').should('exist');

      cy.mockApi({
        mockDeck: fullGameDeck,
        mockInitial: {
          matchesVersion: true,
        },
      });

      cy.visitApp();

      cy.get('[data-test="version"]').should('not.exist');
    });
  });
});
