import { mockVersionNumber } from '../../../src/mockData';
import { version } from '../../../server/package.json';

describe('App', () => {
  afterEach(() => {
    cy.clearTest();
  });

  describe('Default', () => {
    beforeEach(() => {
      cy.visitApp();
    });

    it('it successfully loads', () => {
      cy.checkConnectingAlertIsVisible(false);

      cy.checkBoard();

      cy.checkFoundations();

      cy.getInitialData().then(({ userStats, globalStats }) => {
        cy.checkGameNumber(userStats.completed);
        cy.checkGlobalGameNumber(globalStats.completed);
        cy.checkPlayerNumber(globalStats.players);
      });
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

  describe('Offline', () => {
    it('it should show alert if offline', () => {
      cy.visit('/');

      cy.window()
        .its('solitaire.$store')
        .then((store) => {
          store.dispatch('setIsOnline', false);
        });

      cy.checkOfflineAlertIsVisible(true);

      cy.window()
        .its('solitaire.$store')
        .then((store) => {
          store.dispatch('setIsOnline', true);
        });

      cy.checkOfflineAlertIsVisible(false);
    });
  });

  describe('Version', () => {
    it('it should not show version upgrade toast when no appVersion is set', () => {
      cy.visitApp();

      cy.checkVersionAlertIsVisible(false);
    });

    it('it should not show version upgrade toast', () => {
      localStorage.setItem('appVersion', version);

      cy.visitApp();

      cy.checkVersionAlertIsVisible(false);
    });

    it('it should show version upgrade toast and not show it after page reload', () => {
      localStorage.setItem('appVersion', mockVersionNumber);

      cy.visitApp();

      cy.checkVersionAlertIsVisible(true);

      cy.reload();

      cy.checkVersionAlertIsVisible(false);
    });
  });
});
