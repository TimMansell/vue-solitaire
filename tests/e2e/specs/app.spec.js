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
      cy.checkBoard();

      cy.checkFoundations();
    });

    it('show pause page if url is changed manually', () => {
      cy.visit('#/pause');

      cy.checkGameIsPaused(true);

      cy.resumeGame();

      cy.checkBoard();
    });

    it('it should show 404 page', () => {
      cy.visit('#/abc');

      cy.check404();

      cy.goHome();

      cy.checkBoard();
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
