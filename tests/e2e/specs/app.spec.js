import quitGameDeck from '../../fixtures/decks/quitGame.json';
import { mockVersionNumber } from '../../../src/mockData';

describe('App', () => {
  beforeEach(() => {
    cy.visitApp();
  });

  afterEach(() => {
    cy.clearTest();
  });

  describe('Default', () => {
    it('it successfully loads', () => {
      cy.checkConnectedAlert();

      cy.checkBoard();

      cy.checkFoundations();

      cy.task('getGlobalStats').then(({ completed }) => {
        cy.checkGameNumber(0);
        cy.checkGlobalGameNumber(completed);
      });

      cy.task('getPlayerCount').then((players) => {
        cy.checkPlayerNumber(players);
        cy.checkOnlinePlayerNumber();
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
    it('it should show alert if offline and then hide once online', () => {
      cy.checkConnectedAlert();

      cy.mockIsOnline(false);

      cy.checkConnectionPageIsVisible(true);

      cy.mockIsOnline(true);

      cy.checkConnectionPageIsVisible(false);

      cy.checkConnectedAlert();
    });

    it('it should show alert if offline and then hide when page is reloaded', () => {
      cy.checkConnectedAlert();

      cy.mockIsOnline(false);

      cy.checkConnectionPageIsVisible(true);

      cy.reload();

      cy.checkConnectionPageIsVisible(false);

      cy.checkConnectedAlert();
    });

    it('it should show alert if offline and then hide when reconnect button is clicked', () => {
      cy.checkConnectedAlert();

      cy.mockIsOnline(false);

      cy.checkConnectionPageIsVisible(true);

      cy.reconnect();

      cy.checkConnectionPageIsVisible(false);
    });

    it('it should not allow loading of connection error page if connected', () => {
      cy.checkConnectedAlert();

      cy.visit('#/connection-error');

      cy.checkConnectionPageIsVisible(false);
    });
  });

  describe.skip('Version', () => {
    describe('Upgrading', () => {
      it('it should not show update app to new user', () => {
        cy.checkAppUpdated(false);
      });

      it('it should update up to latest version', () => {
        cy.setBoard(quitGameDeck);

        cy.clickCard('4♠');

        cy.setLocalStorage('appVersion', mockVersionNumber);

        cy.reload();

        cy.checkCardIsNotSelected();

        cy.checkAppUpdated(true);

        cy.waitForAppUpdatedToDisappear();
      });

      it('it should update to latest version if no appVersion is set in localStorage', () => {
        cy.setBoard(quitGameDeck);

        cy.clickCard('4♠');

        cy.removeLocalStorage('appVersion');

        cy.reload();

        cy.checkCardIsNotSelected();

        cy.checkAppUpdated(true);
      });

      it('it should not update up to latest version', () => {
        cy.setBoard(quitGameDeck);

        cy.clickCard('4♠');

        cy.reload();

        cy.checkCardIsSelected('4♠');

        cy.checkAppUpdated(false);
      });
    });

    describe('Show Update', () => {
      it('it should show update for an older version, then show no new updates & game updated on page reload', () => {
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
        cy.visit('#/update');

        cy.checkAppHasUpdated(true);

        cy.checkUpdateTitle('No New Updates');
      });

      it('it should not allow user to leave update page by changing url', () => {
        cy.mockVersionUpdate();

        cy.visit('#/');

        cy.url().should('include', '#/update');
      });
    });
  });
});
