import numeral from 'numeral';

import foundations from '../../fixtures/boards/fullFoundation.json';
import noMovesKingColumn from '../../fixtures/boards/noMovesKingColumn.json';

describe('Global Stats', () => {
  beforeEach(() => {
    cy.clearLocalStorage();

    cy.intercept({
      method: 'POST',
      url: '.netlify/functions/graphql',
    }).as('apiCheck');
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
        cy.get('[data-test="player-count"]').should('not.have.text', '0');
      });

      it('it successfully retrieves games played', () => {
        cy.get('[data-test="global-stats"]').should('not.have.text', '0');

        cy.get('[data-test="global-stats-btn"]').click();

        cy.wait('@apiCheck');

        cy.get('[data-test="stats-played"]').within(() => {
          cy.get('[data-test="counter"]').should('not.have.text', '0');
        });

        cy.get('[data-test="stats-won"]').within(() => {
          cy.get('[data-test="counter"]').should('not.have.text', '0');
        });

        cy.get('[data-test="stats-lost"]').within(() => {
          cy.get('[data-test="counter"]').should('not.have.text', '0');
        });

        cy.get('[data-test="stats-quit"]').within(() => {
          cy.get('[data-test="counter"]').should('not.have.text', '0');
        });
      });

      it('it successfully increments games played', () => {
        cy.get('[data-test="global-stats-btn"]').click();

        cy.wait('@apiCheck');

        cy.get(
          '[data-test="stats-overlay"] [data-test="stats-played"] [data-test="counter"]'
        ).as('gamesPlayed');

        cy.get(
          '[data-test="stats-overlay"] [data-test="stats-quit"] [data-test="counter"]'
        ).as('gamesQuit');

        cy.get('@gamesPlayed').then(($playedCount) => {
          const gamesPlayed = parseInt($playedCount.attr('data-number'), 10);

          cy.get('@gamesQuit').then(($quitCount) => {
            const gamesQuit = parseInt($quitCount.attr('data-number'), 10);

            cy.get('[data-test="close-stats-btn"]').click();

            cy.get('[data-test="global-stats"]').then(($stats) => {
              const number = parseInt($stats.attr('data-number'), 10);

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

            cy.get('@gamesPlayed').should('have.text', newGamesPlayed);
            cy.get('@gamesQuit').should('have.text', newGamesQuit);
          });
        });
      });

      it('it successfully increments games played after lost game', () => {
        cy.setBoard(noMovesKingColumn).then(() => {
          cy.get('[data-test="global-stats-btn"]').click();

          cy.wait('@apiCheck');

          cy.get(
            '[data-test="stats-overlay"] [data-test="stats-played"] [data-test="counter"]'
          ).as('gamesPlayed');

          cy.get(
            '[data-test="stats-overlay"] [data-test="stats-lost"] [data-test="counter"]'
          ).as('gamesLost');

          cy.get('@gamesPlayed').then(($playedCount) => {
            const gamesPlayed = parseInt($playedCount.attr('data-number'), 10);

            cy.get('@gamesLost').then(($lostCount) => {
              const gamesLost = parseInt($lostCount.attr('data-number'), 10);

              cy.get('[data-test="close-stats-btn"]').click();

              cy.get('[data-test="global-stats"]').then(($stats) => {
                const number = parseInt($stats.attr('data-number'), 10);

                console.log({ number });

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

              cy.get('@gamesPlayed').should('have.text', newGamesPlayed);
              cy.get('@gamesLost').should('have.text', newGamesLost);
            });
          });
        });
      });

      it('it successfully increments games played after won game', () => {
        cy.setBoard(foundations).then(() => {
          cy.get('[data-test="global-stats-btn"]').click();

          cy.wait('@apiCheck');

          cy.get(
            '[data-test="stats-overlay"] [data-test="stats-played"] [data-test="counter"]'
          ).as('gamesPlayed');

          cy.get(
            '[data-test="stats-overlay"] [data-test="stats-won"] [data-test="counter"]'
          ).as('gamesWon');

          cy.get('@gamesPlayed').then(($playedCount) => {
            const gamesPlayed = parseInt($playedCount.attr('data-number'), 10);

            cy.get('@gamesWon').then(($lostCount) => {
              const gamesWon = parseInt($lostCount.attr('data-number'), 10);

              cy.get('[data-test="close-stats-btn"]').click();

              cy.get('[data-test="global-stats"]').then(($stats) => {
                const number = parseInt($stats.attr('data-number'), 10);

                console.log({ number });

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

              cy.get('@gamesPlayed').should('have.text', newGamesPlayed);
              cy.get('@gamesWon').should('have.text', newGamesWon);
            });
          });
        });
      });
    });
  });
});
