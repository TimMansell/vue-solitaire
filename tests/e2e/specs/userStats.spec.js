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

        cy.get('[data-test="stats-played"]').within(() => {
          cy.get('[data-test="counter"]').should('have.text', '0');
        });

        cy.get('[data-test="stats-won"]').within(() => {
          cy.get('[data-test="counter"]').should('have.text', '0');
        });

        cy.get('[data-test="stats-lost"]').within(() => {
          cy.get('[data-test="counter"]').should('have.text', '0');
        });

        cy.get('[data-test="stats-quit"]').within(() => {
          cy.get('[data-test="counter"]').should('have.text', '0');
        });
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

        cy.get('[data-test="stats-played"]').within(() => {
          cy.get('[data-test="counter"]').should('have.text', '1');
        });

        cy.get('[data-test="stats-quit"]').within(() => {
          cy.get('[data-test="counter"]').should('have.text', '1');
        });

        cy.get('[data-test="stats-won"]').within(() => {
          cy.get('[data-test="counter"]').should('have.text', '0');
        });

        cy.get('[data-test="stats-lost"]').within(() => {
          cy.get('[data-test="counter"]').should('have.text', '0');
        });
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

          cy.get('[data-test="stats-played"]').within(() => {
            cy.get('[data-test="counter"]').should('have.text', '1');
          });

          cy.get('[data-test="stats-lost"]').within(() => {
            cy.get('[data-test="counter"]').should('have.text', '1');
          });

          cy.get('[data-test="stats-won"]').within(() => {
            cy.get('[data-test="counter"]').should('have.text', '0');
          });

          cy.get('[data-test="stats-quit"]').within(() => {
            cy.get('[data-test="counter"]').should('have.text', '0');
          });
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

          cy.get('[data-test="stats-played"]').within(() => {
            cy.get('[data-test="counter"]').should('have.text', '1');
          });

          cy.get('[data-test="stats-won"]').within(() => {
            cy.get('[data-test="counter"]').should('have.text', '1');
          });

          cy.get('[data-test="stats-lost"]').within(() => {
            cy.get('[data-test="counter"]').should('have.text', '0');
          });

          cy.get('[data-test="stats-quit"]').within(() => {
            cy.get('[data-test="counter"]').should('have.text', '0');
          });
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
        cy.get('[data-test="user-stats-btn"]').click();

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

            cy.get('[data-test="stats"]').then(($stats) => {
              const number = parseInt($stats.attr('data-number'), 10);

              cy.get('[data-test="new-game-btn"]').click();

              cy.get('[data-test="game-new"]').within(() => {
                cy.get('[data-test="new-game-btn"]').click();
              });

              cy.wait('@apiCheck');

              const newNumber = numeral(number + 1).format('0,0');

              cy.get('[data-test="stats"]').should('have.text', newNumber);
            });

            cy.get('[data-test="user-stats-btn"]').click();

            const newGamesPlayed = numeral(gamesPlayed + 1).format('0,0');
            const newGamesQuit = numeral(gamesQuit + 1).format('0,0');

            cy.get('@gamesPlayed').should('have.text', newGamesPlayed);
            cy.get('@gamesQuit').should('have.text', newGamesQuit);
          });
        });
      });

      it('it successfully increments games played after lost game', () => {
        cy.setBoard(noMovesKingColumn).then(() => {
          cy.get('[data-test="user-stats-btn"]').click();

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

              cy.get('[data-test="stats"]').then(($stats) => {
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

                cy.get('[data-test="stats"]').should('have.text', newNumber);
              });

              cy.get('[data-test="user-stats-btn"]').click();

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
          cy.get('[data-test="user-stats-btn"]').click();

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

              cy.get('[data-test="stats"]').then(($stats) => {
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

                cy.get('[data-test="stats"]').should('have.text', newNumber);
              });

              cy.get('[data-test="user-stats-btn"]').click();

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
