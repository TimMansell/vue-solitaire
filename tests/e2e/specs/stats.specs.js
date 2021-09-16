import numeral from 'numeral';
import { mockUid, mockNewUid } from '../../../src/mockData';

describe('Stats', () => {
  afterEach(() => {
    cy.clearTest();
  });

  describe('Default', () => {
    beforeEach(() => {
      localStorage.setItem('luid', mockNewUid);

      cy.visitApp();
    });

    it('should show stats overlay and then close overlay', () => {
      cy.showStats();

      cy.get('[data-test="stats-overlay"]').should('be.visible');

      cy.closeOverlay();

      cy.get('[data-test="stats-overlay"]').should('not.exist');
    });

    it('should not show game paused if user stats overlay is visible', () => {
      cy.document().then((doc) => {
        cy.stub(doc, 'visibilityState').value('hidden');
      });

      cy.showStats();

      cy.document().trigger('visibilitychange');

      cy.get('[data-test="game-paused"]').should('not.exist');
    });

    it('it successfully retrieves player count', () => {
      cy.get('[data-test="player-count"]')
        .text()
        .should('not.equal', '0');
    });
  });

  describe('New User', () => {
    it('it successfully retrieves 0 games played', () => {
      cy.visitApp();

      cy.get('[data-test="stats"]')
        .text()
        .should('equal', '0');

      cy.showStats();

      cy.wait('@waitForInitialDataAPI');

      cy.checkStatsValues({ stat: 'user', values: [0, 0, 0, 0] });
      cy.checkStatsValuesNot({ stat: 'global', values: [0, 0, 0, 0] });
    });

    it('it successfully increments games played', () => {
      cy.visitApp();

      cy.get('[data-test="stats"]')
        .text()
        .should('equal', '0');

      cy.cacheStatValues();

      cy.startNewGame();

      cy.wait('@waitForInitialDataAPI');

      cy.get('[data-test="stats"]')
        .text()
        .should('equal', '1');

      cy.showStats();

      cy.wait('@waitForInitialDataAPI');

      cy.checkStatsValues({ stat: 'user', values: [1, 0, 0, 1] });

      cy.checkGlobalStatsQuit();
    });
  });

  describe('Existing User', () => {
    beforeEach(() => {
      localStorage.setItem('luid', mockUid);
    });

    it('it successfully retrieves games played', () => {
      cy.visitApp();

      cy.get('[data-test="stats"]').should('not.have.text', '0');

      cy.showStats();

      cy.wait('@waitForInitialDataAPI');

      cy.checkStatsValuesNot({ stat: 'user', values: [0, 0, 0, 0] });
      cy.checkStatsValuesNot({ stat: 'global', values: [0, 0, 0, 0] });
    });

    it('it successfully increments games played', () => {
      cy.visitApp();

      cy.cacheStatValues();

      cy.get('[data-test="stats"]').then(($stats) => {
        const number = numeral($stats.text()).value();

        cy.startNewGame();

        cy.wait('@waitForInitialDataAPI');

        const newNumber = numeral(number + 1).format('0,0');

        cy.get('[data-test="stats"]')
          .text()
          .should('equal', newNumber);
      });

      cy.showStats();

      cy.get('@gamesPlayed').then(($played) => {
        const $newPlayed = numeral(numeral($played).value() + 1).format('0,0');

        cy.get('@gamesWon').then(($won) => {
          cy.get('@gamesLost').then(($lost) => {
            cy.get('@gamesQuit').then(($quit) => {
              const $newQuit = numeral(numeral($quit).value() + 1).format(
                '0,0'
              );

              cy.checkStatsValues({
                stat: 'user',
                values: [$newPlayed, $won, $lost, $newQuit],
              });
            });
          });
        });
      });

      cy.checkGlobalStatsQuit();
    });
  });
});
