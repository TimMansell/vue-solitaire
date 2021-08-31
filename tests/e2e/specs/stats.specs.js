import numeral from 'numeral';
import { mockUid } from '../../../src/mockData';
import foundations from '../../fixtures/boards/fullFoundation.json';
import noMovesKingColumn from '../../fixtures/boards/noMovesKingColumn.json';

describe('Stats', () => {
  afterEach(() => {
    cy.clearLocalStorage();
  });

  describe('Default', () => {
    beforeEach(() => {
      cy.visitApp();
    });

    it('should show stats overlay and then close overlay', () => {
      cy.get('[data-test="stats-btn"]').click();

      cy.get('[data-test="stats-overlay"]')
        .should('be.visible')
        .within(() => {
          cy.get('[data-test="game-overlay-close-btn"]').click();
        });

      cy.get('[data-test="stats-overlay"]').should('not.exist');
    });

    it('should not show game paused if user stats overlay is visible', () => {
      cy.document().then((doc) => {
        cy.stub(doc, 'visibilityState').value('hidden');
      });

      cy.get('[data-test="stats-btn"]').click();

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
    beforeEach(() => {
      cy.visitApp();
    });

    it('it successfully retrieves 0 games played', () => {
      cy.get('[data-test="stats"]')
        .text()
        .should('equal', '0');

      cy.get('[data-test="stats-btn"]').click();

      cy.wait('@waitForStatsAPI');

      cy.checkStatsValues({ stat: 'user', values: [0, 0, 0, 0] });
      cy.checkStatsValuesNot({ stat: 'global', values: [0, 0, 0, 0] });
    });

    it('it successfully increments games played', () => {
      cy.get('[data-test="stats"]')
        .text()
        .should('equal', '0');

      cy.cacheStatValues();

      cy.wait('@waitForStatsAPI');

      cy.newGame();

      cy.wait('@waitForStatsAPI');

      cy.get('[data-test="stats"]')
        .text()
        .should('equal', '1');

      cy.get('[data-test="stats-btn"]').click();

      cy.wait('@waitForStatsAPI');

      cy.checkStatsValues({ stat: 'user', values: [1, 0, 0, 1] });

      cy.checkGlobalStatsQuit();
    });

    it('it successfully increments games played after lost game', () => {
      cy.setBoard(noMovesKingColumn).then(() => {
        cy.get('[data-test="stats"]')
          .text()
          .should('equal', '0');

        cy.cacheStatValues();

        cy.get('[data-test="card-Q♣"]').clickTo('[data-test="card-K♣"]');
        cy.get('[data-test="card-K♣"]').clickTo('[data-test="column-1"]');

        cy.wait('@waitForCreateUserAPI');

        cy.get('[data-test="game-lost"]').within(() => {
          cy.get('[data-test="new-game-btn"]').click();
        });

        cy.wait('@waitForStatsAPI');

        cy.get('[data-test="stats"]').should('have.text', 1);

        cy.get('[data-test="stats-btn"]').click();

        cy.wait('@waitForStatsAPI');

        cy.checkStatsValues({ stat: 'user', values: [1, 0, 1, 0] });

        cy.checkGlobalStatsLost();
      });
    });

    it('it successfully increments games played after won game', () => {
      cy.setBoard(foundations).then(() => {
        cy.get('[data-test="stats"]')
          .text()
          .should('equal', '0');

        cy.cacheStatValues();

        cy.get('[data-test="card-Q♠"]').clickTo('[data-test="foundation-3"]');
        cy.get('[data-test="card-K♠"]').clickTo('[data-test="foundation-3"]');

        cy.wait('@waitForCreateUserAPI');

        cy.get('[data-test="game-won"]').within(() => {
          cy.get('[data-test="new-game-btn"]').click();
        });

        cy.wait('@waitForStatsAPI');

        cy.get('[data-test="stats"]').should('have.text', 1);

        cy.get('[data-test="stats-btn"]').click();

        cy.wait('@waitForStatsAPI');

        cy.checkStatsValues({ stat: 'user', values: [1, 1, 0, 0] });

        cy.checkGlobalStatsWon();
      });
    });
  });

  describe('Existing User', () => {
    beforeEach(() => {
      localStorage.setItem('luid', mockUid);

      cy.visitApp();
    });

    it('it successfully retrieves games played', () => {
      cy.get('[data-test="stats"]').should('not.have.text', '0');

      cy.get('[data-test="stats-btn"]').click();

      cy.wait('@waitForStatsAPI');

      cy.checkStatsValuesNot({ stat: 'user', values: [0, 0, 0, 0] });
      cy.checkStatsValuesNot({ stat: 'global', values: [0, 0, 0, 0] });
    });

    it('it successfully increments games played', () => {
      cy.cacheStatValues();

      cy.get('[data-test="stats"]').then(($stats) => {
        const number = numeral($stats.text()).value();

        cy.newGame();

        cy.wait('@waitForStatsAPI');

        const newNumber = numeral(number + 1).format('0,0');

        cy.get('[data-test="stats"]')
          .text()
          .should('equal', newNumber);
      });

      cy.get('[data-test="stats-btn"]').click();

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

    it('it successfully increments games played after lost game', () => {
      cy.setBoard(noMovesKingColumn).then(() => {
        cy.cacheStatValues();

        cy.get('[data-test="stats"]').then(($stats) => {
          const number = numeral($stats.text()).value();

          cy.get('[data-test="card-Q♣"]').clickTo('[data-test="card-K♣"]');
          cy.get('[data-test="card-K♣"]').clickTo('[data-test="column-1"]');

          cy.get('[data-test="game-lost"]').within(() => {
            cy.get('[data-test="new-game-btn"]').click();
          });

          cy.wait('@waitForStatsAPI');

          const newNumber = numeral(number + 1).format('0,0');

          cy.get('[data-test="stats"]')
            .text()
            .should('equal', newNumber);
        });

        cy.get('[data-test="stats-btn"]').click();

        cy.get('@gamesPlayed').then(($played) => {
          const $newPlayed = numeral(numeral($played).value() + 1).format(
            '0,0'
          );

          cy.get('@gamesWon').then(($won) => {
            cy.get('@gamesLost').then(($lost) => {
              const $newLost = numeral(numeral($lost).value() + 1).format(
                '0,0'
              );
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

    it('it successfully increments games played after won game', () => {
      cy.setBoard(foundations).then(() => {
        cy.cacheStatValues();

        cy.get('[data-test="stats"]').then(($stats) => {
          const number = numeral($stats.text()).value();

          cy.get('[data-test="card-Q♠"]').clickTo('[data-test="foundation-3"]');
          cy.get('[data-test="card-K♠"]').clickTo('[data-test="foundation-3"]');

          cy.get('[data-test="game-won"]').within(() => {
            cy.get('[data-test="new-game-btn"]').click();
          });

          cy.wait('@waitForStatsAPI');

          const newNumber = numeral(number + 1).format('0,0');

          cy.get('[data-test="stats"]')
            .text()
            .should('equal', newNumber);
        });

        cy.get('[data-test="stats-btn"]').click();

        cy.get('@gamesPlayed').then(($played) => {
          const $newPlayed = numeral(numeral($played).value() + 1).format(
            '0,0'
          );

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
});
