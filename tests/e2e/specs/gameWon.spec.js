import numeral from 'numeral';
import fullGameDeck from '../../fixtures/decks/fullGame.json';
import fullGameMoves from '../../fixtures/moves/fullGame.json';
import { mockUid, mockNewUid } from '../../../src/mockData';

describe('Timer', () => {
  afterEach(() => {
    cy.clearTest();
  });

  describe('New User', () => {
    it('should win game, keep state on page refresh, and increment won game stats', () => {
      cy.task('clearUser', mockNewUid);

      localStorage.setItem('luid', mockNewUid);

      cy.task('populateDeck', [fullGameDeck, mockNewUid]);

      cy.visitApp({ mockDeck: fullGameDeck });

      cy.cacheStatValues();

      cy.runGameWithClicks(fullGameMoves);

      cy.get('[data-test="game-won"]').should('be.visible');

      // Test timer
      cy.get('[data-test="timer"]').then(($timerStart) => {
        const startNumber = $timerStart.text();

        cy.reloadAndWait();

        cy.get('[data-test="timer"]').then(($timerEnd) => {
          const endNumber = $timerEnd.text();

          expect(startNumber).to.equal(endNumber);
        });
      });

      cy.reloadAndWait();

      cy.get('[data-test="game-won"]').should('be.visible');
      cy.get('[data-test="game-lost"]').should('not.exist');

      cy.confirmNewGame();

      // Timer should reset
      cy.get('[data-test="timer"]').should('contain', '0:00:00');

      cy.wait('@waitForCreateUserAPI');

      // Check stats
      cy.get('[data-test="stats"]').should('have.text', 1);

      cy.showStats();

      cy.checkStatsValues({ stat: 'user', values: [1, 1, 0, 0] });

      cy.checkGlobalStatsWon();
    });
  });

  describe('Existing User', () => {
    it('should win game, keep state on page refresh, and increment won game stats', () => {
      cy.task('clearUser', mockUid);

      localStorage.setItem('luid', mockUid);

      cy.task('populateDeck', [fullGameDeck, mockUid]);

      cy.visitApp({ mockDeck: fullGameDeck });

      cy.cacheStatValues();

      cy.runGameWithClicks(fullGameMoves);

      cy.get('[data-test="game-won"]').should('be.visible');

      // Test timer
      cy.get('[data-test="timer"]').then(($timerStart) => {
        const startNumber = $timerStart.text();

        cy.reloadAndWait();

        cy.get('[data-test="timer"]').then(($timerEnd) => {
          const endNumber = $timerEnd.text();

          expect(startNumber).to.equal(endNumber);
        });
      });

      cy.get('[data-test="game-won"]').should('be.visible');
      cy.get('[data-test="game-lost"]').should('not.exist');

      // Check stats
      cy.get('[data-test="stats"]').then(($stats) => {
        const number = numeral($stats.text()).value();

        cy.confirmNewGame();

        // Timer should reset
        cy.get('[data-test="timer"]').should('contain', '0:00:00');

        const newNumber = numeral(number + 1).format('0,0');

        cy.get('[data-test="stats"]')
          .text()
          .should('equal', newNumber);
      });

      cy.showStats();

      cy.get('@gamesPlayed').then(($played) => {
        const $newPlayed = numeral(numeral($played).value() + 1).format('0,0');

        cy.get('@gamesWon').then(($won) => {
          const $newWon = numeral(numeral($won).value() + 1).format('0,0');

          cy.get('@gamesLost').then(($lost) => {
            cy.get('@gamesQuit').then(($quit) => {
              cy.checkStatsValues({
                stat: 'user',
                values: [$newPlayed, $newWon, $lost, $quit],
              });
            });
          });
        });
      });

      cy.checkGlobalStatsWon();
    });
  });
});
