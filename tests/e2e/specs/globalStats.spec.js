import numeral from 'numeral';

import foundations from '../../fixtures/boards/fullFoundation.json';
import noMovesKingColumn from '../../fixtures/boards/noMovesKingColumn.json';

describe('Global Stats', () => {
  beforeEach(() => {
    cy.clearLocalStorage();

    cy.intercept('POST', '.netlify/functions/graphql', (req) => {
      const { body } = req;

      if (body?.query.includes('globalStats')) {
        // eslint-disable-next-line no-param-reassign
        req.alias = 'apiCheck';
      }
    });
  });

  describe('Global Stats', () => {
    beforeEach(() => {
      cy.visit('/');

      cy.wait('@apiCheck');
    });

    describe('Default', () => {
      it('should show global stats overlay and then close overlay', () => {
        cy.get('[data-test="global-stats-btn"]').click();

        cy.get('[data-test="stats-overlay"]')
          .should('be.visible')
          .within(() => {
            cy.get('[data-test="close-stats-btn"]').click();
          });

        cy.get('[data-test="stats-overlay"]').should('not.exist');
      });

      it('should show global stats overlay on page refresh', () => {
        cy.get('[data-test="global-stats-btn"]').click();

        cy.reload();

        cy.get('[data-test="stats-overlay"]').should('be.visible');
      });

      it('should not show game paused if global stats overlay is visible', () => {
        cy.document().then((doc) => {
          cy.stub(doc, 'visibilityState').value('hidden');
        });

        cy.get('[data-test="global-stats-btn"]').click({ force: true });

        cy.document().trigger('visibilitychange');

        cy.get('[data-test="game-paused"]').should('not.exist');
      });
    });

    describe('Global', () => {
      it('it successfully retrieves player count', () => {
        cy.get('[data-test="player-count"]')
          .text()
          .should('not.equal', '0');
      });

      it('it successfully retrieves games played', () => {
        cy.get('[data-test="global-stats"]')
          .text()
          .should('not.equal', '0');

        cy.get('[data-test="global-stats-btn"]').click();

        cy.wait('@apiCheck');

        cy.get('[data-test="stats-overlay"] [data-test="table-cell"]')
          .eq(0)
          .text()
          .should('not.equal', '0');

        cy.get('[data-test="stats-overlay"] [data-test="table-cell"]')
          .eq(1)
          .text()
          .should('not.equal', '0');

        cy.get('[data-test="stats-overlay"] [data-test="table-cell"]')
          .eq(2)
          .text()
          .should('not.equal', '0');

        cy.get('[data-test="stats-overlay"] [data-test="table-cell"]')
          .eq(3)
          .text()
          .should('not.equal', '0');
      });

      it('it successfully increments games played', () => {
        cy.get('[data-test="global-stats-btn"]').click();

        cy.wait('@apiCheck');

        cy.get('[data-test="stats-overlay"] [data-test="table-cell"]')
          .eq(0)
          .as('gamesPlayed');

        cy.get('[data-test="stats-overlay"] [data-test="table-cell"]')
          .eq(3)
          .as('gamesQuit');

        cy.get('@gamesPlayed').then(($playedCount) => {
          const gamesPlayed = numeral($playedCount.text()).value();

          cy.get('@gamesQuit').then(($quitCount) => {
            const gamesQuit = numeral($quitCount.text()).value();

            cy.get('[data-test="close-stats-btn"]').click();

            cy.get('[data-test="global-stats"]').then(($stats) => {
              const number = numeral($stats.text()).value();

              cy.get('[data-test="new-game-btn"]').click();

              cy.get('[data-test="game-new"]').within(() => {
                cy.get('[data-test="new-game-btn"]').click();
              });

              cy.wait('@apiCheck');

              const newNumber = numeral(number + 1).format('0,0');

              cy.get('[data-test="global-stats"]').should(
                'have.text',
                newNumber
              );
            });

            cy.get('[data-test="global-stats-btn"]').click();

            const newGamesPlayed = numeral(gamesPlayed + 1).format('0,0');
            const newGamesQuit = numeral(gamesQuit + 1).format('0,0');

            cy.get('@gamesPlayed')
              .text()
              .should('equal', newGamesPlayed);

            cy.get('@gamesQuit')
              .text()
              .should('equal', newGamesQuit);
          });
        });
      });

      it('it successfully increments games played after lost game', () => {
        cy.setBoard(noMovesKingColumn).then(() => {
          cy.get('[data-test="global-stats-btn"]').click();

          cy.wait('@apiCheck');

          cy.get('[data-test="stats-overlay"] [data-test="table-cell"]')
            .eq(0)
            .as('gamesPlayed');

          cy.get('[data-test="stats-overlay"] [data-test="table-cell"]')
            .eq(2)
            .as('gamesLost');

          cy.get('@gamesPlayed').then(($playedCount) => {
            const gamesPlayed = numeral($playedCount.text()).value();

            cy.get('@gamesLost').then(($lostCount) => {
              const gamesLost = numeral($lostCount.text()).value();

              cy.get('[data-test="close-stats-btn"]').click();

              cy.get('[data-test="global-stats"]').then(($stats) => {
                const number = numeral($stats.text()).value();

                cy.get('[data-test="card-Q♣"]').clickTo(
                  '[data-test="card-K♣"]'
                );
                cy.get('[data-test="card-K♣"]').clickTo(
                  '[data-test="column-1"]'
                );

                cy.get('[data-test="game-lost"]').within(() => {
                  cy.get('[data-test="new-game-btn"]').click();
                });

                cy.wait('@apiCheck');

                const newNumber = numeral(number + 1).format('0,0');

                cy.get('[data-test="global-stats"]').should(
                  'have.text',
                  newNumber
                );
              });

              cy.get('[data-test="global-stats-btn"]').click();

              const newGamesPlayed = numeral(gamesPlayed + 1).format('0,0');
              const newGamesLost = numeral(gamesLost + 1).format('0,0');

              cy.get('@gamesPlayed')
                .text()
                .should('equal', newGamesPlayed);

              cy.get('@gamesLost')
                .text()
                .should('equal', newGamesLost);
            });
          });
        });
      });

      it('it successfully increments games played after won game', () => {
        cy.setBoard(foundations).then(() => {
          cy.get('[data-test="global-stats-btn"]').click();

          cy.wait('@apiCheck');

          cy.get('[data-test="stats-overlay"] [data-test="table-cell"]')
            .eq(0)
            .as('gamesPlayed');

          cy.get('[data-test="stats-overlay"] [data-test="table-cell"]')
            .eq(1)
            .as('gamesWon');

          cy.get('@gamesPlayed').then(($playedCount) => {
            const gamesPlayed = numeral($playedCount.text()).value();

            cy.get('@gamesWon').then(($wonCount) => {
              const gamesWon = numeral($wonCount.text()).value();

              cy.get('[data-test="close-stats-btn"]').click();

              cy.get('[data-test="global-stats"]').then(($stats) => {
                const number = numeral($stats.text()).value();

                cy.get('[data-test="card-Q♠"]').clickTo(
                  '[data-test="foundation-3"]'
                );
                cy.get('[data-test="card-K♠"]').clickTo(
                  '[data-test="foundation-3"]'
                );

                cy.get('[data-test="game-won"]').within(() => {
                  cy.get('[data-test="new-game-btn"]').click();
                });

                cy.wait('@apiCheck');

                const newNumber = numeral(number + 1).format('0,0');

                cy.get('[data-test="global-stats"]').should(
                  'have.text',
                  newNumber
                );
              });

              cy.get('[data-test="global-stats-btn"]').click();

              const newGamesPlayed = numeral(gamesPlayed + 1).format('0,0');
              const newGamesWon = numeral(gamesWon + 1).format('0,0');

              cy.get('@gamesPlayed')
                .text()
                .should('equal', newGamesPlayed);

              cy.get('@gamesWon')
                .text()
                .should('equal', newGamesWon);
            });
          });
        });
      });
    });
  });
});
