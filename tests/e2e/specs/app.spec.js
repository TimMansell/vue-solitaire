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

      cy.checkVersionPopup(false);
    });

    it('it should show version upgrade toast', () => {
      cy.mockApi({
        mockDeck: fullGameDeck,
        mockInitial: {
          matchesVersion: false,
        },
      });

      cy.visitApp();

      cy.checkVersionPopup(true);
    });

    it('it should show version upgrade toast and not show it after page reload', () => {
      cy.mockApi({
        mockDeck: fullGameDeck,
        mockInitial: {
          matchesVersion: false,
        },
      });

      cy.visitApp();

      cy.checkVersionPopup(true);

      cy.mockApi({
        mockDeck: fullGameDeck,
        mockInitial: {
          matchesVersion: true,
        },
      });

      cy.reload();

      cy.checkVersionPopup(false);
    });
  });
});
