import quitGameDeck from '../../fixtures/decks/quitGame.json';
import { mockVersionNumber } from '../../../src/mockData';

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

      cy.task('getGlobalCounts').then(({ players, completed }) => {
        cy.checkGameNumber(0);
        cy.checkGlobalGameNumber(completed);
        cy.checkPlayerNumber(players);
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

  describe.skip('Offline', () => {
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
    describe('Upgrading', () => {
      it('it should not show update app to new user', () => {
        cy.visitApp();

        cy.checkAppUpdated(false);
      });

      it('it should update up to latest version', () => {
        cy.setDeck(quitGameDeck).then(() => {
          cy.visitApp();
        });

        cy.clickCard('4♠');

        cy.setLocalStorage('appVersion', mockVersionNumber);

        cy.reload();

        cy.checkCardIsNotSelected('4♠');

        cy.checkAppUpdated(true);

        cy.waitForAppUpdatedToDisappear();
      });

      it('it should update to latest version if no appVersion is set in localStorage', () => {
        cy.setDeck(quitGameDeck).then(() => {
          cy.visitApp();
        });

        cy.clickCard('4♠');

        cy.removeLocalStorage('appVersion');

        cy.reload();

        cy.checkCardIsNotSelected('4♠');

        cy.checkAppUpdated(true);
      });

      it('it should not update up to latest version', () => {
        cy.setDeck(quitGameDeck).then(() => {
          cy.visitApp();
        });

        cy.clickCard('4♠');

        cy.reload();

        cy.checkCardIsSelected('4♠');

        cy.checkAppUpdated(false);
      });
    });

    describe('Show Update', () => {
      it('it should show update for an older version, then show no new updates & game updated on page reload', () => {
        cy.visitApp();

        cy.mockVersionUpdate();

        cy.checkAppHasUpdated(true);

        cy.checkUpdateTitle('New Update');

        cy.setLocalStorage('appVersion', mockVersionNumber);

        cy.wait(1000);
        cy.reload();

        cy.checkUpdateTitle('No New Updates');

        cy.checkAppUpdated(true);
      });

      it('it should show update for an older version, then show game updated on when update button is pressed', () => {
        cy.visitApp();

        cy.mockVersionUpdate();

        cy.checkAppHasUpdated(true);

        cy.checkUpdateTitle('New Update');

        cy.setLocalStorage('appVersion', mockVersionNumber);

        cy.wait(1000);
        cy.update();

        cy.checkAppHasUpdated(false);

        cy.checkAppUpdated(true);
      });

      it('it should not show no updates on update page', () => {
        cy.visitApp();

        cy.visit('#/update');

        cy.checkAppHasUpdated(true);

        cy.checkUpdateTitle('No New Updates');
      });

      it('it should not allow user to leave update page by changing url', () => {
        cy.visitApp();

        cy.mockVersionUpdate();

        cy.visit('#/');

        cy.url().should('include', '#/update');
      });
    });
  });
});
