import numeral from 'numeral';
import incompleteGameDeck from '../../fixtures/decks/incompleteGame.json';
import incompleteGameMoves from '../../fixtures/moves/incompleteGame.json';
import noMovesKingColumnDeck from '../../fixtures/decks/noMovesKingColumn.json';
import noMovesKingColumnMoves from '../../fixtures/moves/noMovesKingColumn.json';
import initialAceMoveDeck from '../../fixtures/decks/initialAceMove.json';
import initialAceAnd2MoveDeck from '../../fixtures/decks/initialAceAnd2Move.json';
import { mockUid, mockNewUid } from '../../../src/mockData';

describe('No moves', () => {
  afterEach(() => {
    cy.clearTest();
  });

  describe('Variations', () => {
    it('should have K♣ as an available move then no moves after that', () => {
      cy.visitApp({ mockDeck: noMovesKingColumnDeck });

      cy.runGameWithClicks(noMovesKingColumnMoves);

      cy.get('[data-test="game-lost"]').should('be.visible');
    });

    it('should have A♦ as an available foundation move then no moves after that', () => {
      cy.visitApp({ mockDeck: initialAceMoveDeck });

      cy.get('[data-test="card-A♦"]').clickTo('[data-test="foundation-0"]');

      cy.get('[data-test="game-lost"]').should('be.visible');
    });

    it('should have 2♦ as an available foundation move then no moves after that', () => {
      cy.visitApp({ mockDeck: initialAceAnd2MoveDeck });

      cy.get('[data-test="card-A♦"]').clickTo('[data-test="foundation-0"]');
      cy.get('[data-test="card-2♦"]').clickTo('[data-test="foundation-0"]');

      cy.get('[data-test="game-lost"]').should('be.visible');
    });
  });

  describe('New User', () => {
    it('should lose game, keep state on page refresh, and increment lost game stats', () => {
      cy.task('clearUser', mockNewUid);

      localStorage.setItem('luid', mockNewUid);

      cy.task('populateDeck', [incompleteGameDeck, mockNewUid]);

      cy.visitApp({ mockDeck: incompleteGameDeck });

      cy.cacheStatValues();

      cy.runGameWithClicks(incompleteGameMoves);

      cy.get('[data-test="game-lost"]').should('exist');

      cy.testShowBoard();

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

      cy.get('[data-test="game-lost"]').should('exist');
      cy.get('[data-test="game-won"]').should('not.exist');

      cy.confirmNewGame();

      // Timer should reset
      cy.get('[data-test="timer"]').should('contain', '0:00:00');

      cy.wait('@waitForCreateUserAPI');

      // Check stats
      cy.get('[data-test="stats"]').should('have.text', 1);

      cy.showStats();

      cy.checkStatsValues({ stat: 'user', values: [1, 0, 1, 0] });

      cy.checkGlobalStatsLost();
    });
  });

  describe('Existing User', () => {
    it('should lose game, keep state on page refresh, and increment lost game stats', () => {
      cy.task('clearUser', mockUid);

      localStorage.setItem('luid', mockUid);

      cy.task('populateDeck', [incompleteGameDeck, mockUid]);

      cy.visitApp({ mockDeck: incompleteGameDeck });

      cy.cacheStatValues();

      cy.runGameWithClicks(incompleteGameMoves);

      cy.get('[data-test="game-lost"]').should('exist');

      cy.testShowBoard();

      // Test timer
      cy.get('[data-test="timer"]').then(($timerStart) => {
        const startNumber = $timerStart.text();

        cy.reloadAndWait();

        cy.get('[data-test="timer"]').then(($timerEnd) => {
          const endNumber = $timerEnd.text();

          expect(startNumber).to.equal(endNumber);
        });
      });

      cy.get('[data-test="game-lost"]').should('exist');
      cy.get('[data-test="game-won"]').should('not.exist');

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
          cy.get('@gamesLost').then(($lost) => {
            const $newLost = numeral(numeral($lost).value() + 1).format('0,0');
            cy.get('@gamesQuit').then(($quit) => {
              cy.checkStatsValues({
                stat: 'user',
                values: [$newPlayed, $won, $newLost, $quit],
              });
            });
          });
        });
      });

      cy.checkGlobalStatsLost();
    });
  });
});
