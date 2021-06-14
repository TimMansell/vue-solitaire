import numeral from 'numeral';

import foundations from '../../fixtures/boards/fullFoundation.json';
import noMovesKingColumn from '../../fixtures/boards/noMovesKingColumn.json';

const mockUid = '7dac9d78-353f-409b-8a7f-2192409c44a2';

describe('Stats', () => {
  beforeEach(() => {
    cy.clearLocalStorage();

    cy.intercept('POST', '.netlify/functions/graphql', (req) => {
      const { body } = req;

      if (body?.query.includes('userStats')) {
        // eslint-disable-next-line no-param-reassign
        req.alias = 'apiCheck';
      }
    });
  });

  describe('User Stats', () => {
    describe('Default', () => {
      beforeEach(() => {
        cy.visit('/');

        cy.wait('@apiCheck');
      });

      it('should show user stats overlay and then close overlay', () => {
        cy.get('[data-test="user-stats-btn"]').click();

        cy.get('[data-test="stats-overlay"]')
          .should('be.visible')
          .within(() => {
            cy.get('[data-test="close-stats-btn"]').click();
          });

        cy.get('[data-test="stats-overlay"]').should('not.exist');
      });

      it('should show user stats overlay on page refresh', () => {
        cy.get('[data-test="user-stats-btn"]').click();

        cy.reload();

        cy.get('[data-test="stats-overlay"]').should('be.visible');
      });

      it('should not show game paused if user stats overlay is visible', () => {
        cy.document().then((doc) => {
          cy.stub(doc, 'visibilityState').value('hidden');
        });

        cy.get('[data-test="user-stats-btn"]').click();

        cy.document().trigger('visibilitychange');

        cy.get('[data-test="game-paused"]').should('not.exist');
      });
    });

    describe('New User', () => {
      beforeEach(() => {
        cy.visit('/');

        cy.wait('@apiCheck');
      });

      it('it successfully retrieves 0 games played', () => {
        cy.get('[data-test="stats"]').should('have.text', 0);

        cy.get('[data-test="user-stats-btn"]').click();

        cy.wait('@apiCheck');

        cy.get('[data-test="stats-overlay"] [data-test="table-cell"]')
          .eq(0)
          .text()
          .should('equal', '0');

        cy.get('[data-test="stats-overlay"] [data-test="table-cell"]')
          .eq(1)
          .text()
          .should('equal', '0');

        cy.get('[data-test="stats-overlay"] [data-test="table-cell"]')
          .eq(2)
          .text()
          .should('equal', '0');

        cy.get('[data-test="stats-overlay"] [data-test="table-cell"]')
          .eq(3)
          .text()
          .should('equal', '0');
      });

      it('it successfully increments games played', () => {
        cy.get('[data-test="stats"]').should('have.text', '0');

        cy.get('[data-test="new-game-btn"]').click();

        cy.get('[data-test="game-new"]').within(() => {
          cy.get('[data-test="new-game-btn"]').click();
        });

        cy.wait('@apiCheck');

        cy.get('[data-test="stats"]').should('have.text', '1');

        cy.get('[data-test="user-stats-btn"]').click();

        cy.wait('@apiCheck');

        cy.get('[data-test="stats-overlay"] [data-test="table-cell"]')
          .eq(0)
          .text()
          .should('equal', '1');

        cy.get('[data-test="stats-overlay"] [data-test="table-cell"]')
          .eq(1)
          .text()
          .should('equal', '0');

        cy.get('[data-test="stats-overlay"] [data-test="table-cell"]')
          .eq(2)
          .text()
          .should('equal', '0');

        cy.get('[data-test="stats-overlay"] [data-test="table-cell"]')
          .eq(3)
          .text()
          .should('equal', '1');
      });

      it('it successfully increments games played after lost game', () => {
        cy.get('[data-test="stats"]').should('have.text', 0);

        cy.setBoard(noMovesKingColumn).then(() => {
          cy.get('[data-test="card-Q♣"]').clickTo('[data-test="card-K♣"]');
          cy.get('[data-test="card-K♣"]').clickTo('[data-test="column-1"]');

          cy.get('[data-test="game-lost"]').within(() => {
            cy.get('[data-test="new-game-btn"]').click();
          });

          cy.wait('@apiCheck');

          cy.get('[data-test="stats"]').should('have.text', 1);

          cy.get('[data-test="user-stats-btn"]').click();

          cy.wait('@apiCheck');

          cy.get('[data-test="stats-overlay"] [data-test="table-cell"]')
            .eq(0)
            .text()
            .should('equal', '1');

          cy.get('[data-test="stats-overlay"] [data-test="table-cell"]')
            .eq(1)
            .text()
            .should('equal', '0');

          cy.get('[data-test="stats-overlay"] [data-test="table-cell"]')
            .eq(2)
            .text()
            .should('equal', '1');

          cy.get('[data-test="stats-overlay"] [data-test="table-cell"]')
            .eq(3)
            .text()
            .should('equal', '0');
        });
      });

      it('it successfully increments games played after won game', () => {
        cy.get('[data-test="stats"]').should('have.text', 0);

        cy.setBoard(foundations).then(() => {
          cy.get('[data-test="card-Q♠"]').clickTo('[data-test="foundation-3"]');
          cy.get('[data-test="card-K♠"]').clickTo('[data-test="foundation-3"]');

          cy.get('[data-test="game-won"]').within(() => {
            cy.get('[data-test="new-game-btn"]').click();
          });

          cy.wait('@apiCheck');

          cy.get('[data-test="stats"]').should('have.text', 1);

          cy.get('[data-test="user-stats-btn"]').click();

          cy.wait('@apiCheck');

          cy.get('[data-test="stats-overlay"] [data-test="table-cell"]')
            .eq(0)
            .text()
            .should('equal', '1');

          cy.get('[data-test="stats-overlay"] [data-test="table-cell"]')
            .eq(1)
            .text()
            .should('equal', '1');

          cy.get('[data-test="stats-overlay"] [data-test="table-cell"]')
            .eq(2)
            .text()
            .should('equal', '0');

          cy.get('[data-test="stats-overlay"] [data-test="table-cell"]')
            .eq(3)
            .text()
            .should('equal', '0');
        });
      });
    });

    describe('Existing User', () => {
      beforeEach(() => {
        localStorage.setItem('luid', mockUid);

        cy.visit('/');

        cy.wait('@apiCheck');
      });

      it('it successfully retrieves games played', () => {
        cy.get('[data-test="stats"]').should('not.have.text', '0');

        cy.get('[data-test="user-stats-btn"]').click();

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
        cy.get('[data-test="user-stats-btn"]').click();

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

            cy.get('[data-test="stats"]').then(($stats) => {
              const number = numeral($stats.text()).value();

              cy.get('[data-test="new-game-btn"]').click();

              cy.get('[data-test="game-new"]').within(() => {
                cy.get('[data-test="new-game-btn"]').click();
              });

              cy.wait('@apiCheck');

              const newNumber = numeral(number + 1).format('0,0');

              cy.get('[data-test="stats"]')
                .text()
                .should('equal', newNumber);
            });

            cy.get('[data-test="user-stats-btn"]').click();

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
          cy.get('[data-test="user-stats-btn"]').click();

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

              cy.get('[data-test="stats"]').then(($stats) => {
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

                cy.get('[data-test="stats"]')
                  .text()
                  .should('equal', newNumber);
              });

              cy.get('[data-test="user-stats-btn"]').click();

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
          cy.get('[data-test="user-stats-btn"]').click();

          cy.wait('@apiCheck');

          cy.get('[data-test="stats-overlay"] [data-test="table-cell"]')
            .eq(0)
            .as('gamesPlayed');

          cy.get('[data-test="stats-overlay"] [data-test="table-cell"]')
            .eq(1)
            .as('gamesWon');

          cy.get('@gamesPlayed').then(($playedCount) => {
            const gamesPlayed = numeral($playedCount.text()).value();

            cy.get('@gamesWon').then(($lostCount) => {
              const gamesWon = numeral($lostCount.text()).value();

              cy.get('[data-test="close-stats-btn"]').click();

              cy.get('[data-test="stats"]').then(($stats) => {
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

                cy.get('[data-test="stats"]')
                  .text()
                  .should('equal', newNumber);
              });

              cy.get('[data-test="user-stats-btn"]').click();

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
