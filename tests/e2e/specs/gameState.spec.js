import { mockUid } from '../../../src/mockData';
import foundations from '../../fixtures/boards/fullFoundation.json';
import noMovesKingColumn from '../../fixtures/boards/noMovesKingColumn.json';

describe('Game State', () => {
  beforeEach(() => {
    cy.clearLocalStorage();

    localStorage.setItem('luid', mockUid);

    cy.visit('/');
  });

  it('refreshing page shows same board state', () => {
    let initalCard1;
    let initialCard2;
    let initialCard3;
    let finalCard1;
    let finalCard2;
    let finalCard3;

    cy.get('[data-test="column-0"]').within(() => {
      cy.get('[data-test^="card"]')
        .eq(6)
        .then(($card) => {
          initalCard1 = $card.attr('data-test');
        });
    });

    cy.get('[data-test="column-2"]').within(() => {
      cy.get('[data-test^="card"]')
        .eq(4)
        .then(($card) => {
          initialCard2 = $card.attr('data-test');
        });
    });

    cy.get('[data-test="column-5"]').within(() => {
      cy.get('[data-test^="card"]')
        .eq(1)
        .then(($card) => {
          initialCard3 = $card.attr('data-test');
        });
    });

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);

    cy.reload();

    cy.get('[data-test="column-0"]').within(() => {
      cy.get('[data-test^="card"]')
        .eq(6)
        .then(($card) => {
          finalCard1 = $card.attr('data-test');

          expect(initalCard1).to.equal(finalCard1);
        });
    });

    cy.get('[data-test="column-2"]').within(() => {
      cy.get('[data-test^="card"]')
        .eq(4)
        .then(($card) => {
          finalCard2 = $card.attr('data-test');

          expect(initialCard2).to.equal(finalCard2);
        });
    });

    cy.get('[data-test="column-5"]').within(() => {
      cy.get('[data-test^="card"]')
        .eq(1)
        .then(($card) => {
          finalCard3 = $card.attr('data-test');

          expect(initialCard3).to.equal(finalCard3);
        });
    });
  });

  it('clicking on new game sets new board state', () => {
    cy.setBoard(foundations).then(() => {
      cy.get('[data-test="new-game-btn"]').click();

      cy.get('[data-test="game-overlay-btns"]').within(() => {
        cy.get('[data-test="new-game-btn"]').click();
      });

      cy.reload();

      cy.get('[data-test="columns"]').within(() => {
        cy.get('[data-test="column-card-placeholder"]').should(
          'have.length',
          0
        );
      });
    });
  });

  it('clicking on card then refreshing page should highlight card, then unhighlight card', () => {
    cy.get('[data-test="column-0"]').within(() => {
      cy.get('[data-test^="card"]')
        .eq(6)
        .click()
        .should('have.class', 'card--is-selected');
    });

    cy.reload();

    cy.get('[data-test="column-0"]').within(() => {
      cy.get('[data-test^="card"]')
        .eq(6)
        .should('have.class', 'card--is-selected')
        .click()
        .should('not.have.class', 'card--is-selected');
    });
  });

  it('refreshing page on game won shows game won state', () => {
    cy.setBoard(foundations).then(() => {
      cy.get('[data-test="card-Q♠"]').clickTo('[data-test="foundation-3"]');
      cy.get('[data-test="card-K♠"]').clickTo('[data-test="foundation-3"]');

      cy.get('[data-test="game-won"]').should('be.visible');

      cy.reload();

      cy.get('[data-test="game-won"]').should('be.visible');
    });
  });

  it('refreshing page on game lost shows game lost state', () => {
    cy.setBoard(noMovesKingColumn).then(() => {
      cy.get('[data-test="card-K♣"]').clickTo('[data-test="column-1"]');
      cy.get('[data-test="card-Q♣"]').clickTo('[data-test="card-K♣"]');

      cy.get('[data-test="game-lost"]').should('be.visible');

      cy.reload();

      cy.get('[data-test="game-lost"]').should('be.visible');
    });
  });

  it('refreshing page on leaderboards shows leaderboards', () => {
    cy.get('[data-test="leaderboards-btn"]').click();

    cy.get('[data-test="leaderboards-overlay"]').should('be.visible');

    cy.reload();

    cy.get('[data-test="leaderboards-overlay"]').should('be.visible');
  });

  it('refreshing page on how to play shows how to play', () => {
    cy.get('[data-test="game-rules-btn"]').click();

    cy.get('[data-test="rules-overlay"]').should('be.visible');

    cy.reload();

    cy.get('[data-test="rules-overlay"]').should('be.visible');
  });

  it('should pause when page is automatically hidden', () => {
    cy.document().then((doc) => {
      cy.stub(doc, 'visibilityState').value('hidden');
    });

    cy.document().trigger('visibilitychange');

    cy.get('[data-test="game-paused"]').should('be.visible');
  });

  it('refreshing page on game paused shows game paused state', () => {
    cy.get('[data-test="pause-game-btn"]').click();

    cy.get('[data-test="game-paused"]').should('be.visible');

    cy.reload();

    cy.get('[data-test="game-paused"]').should('be.visible');
  });

  it('refreshing page on new game shows new game state', () => {
    cy.setBoard(foundations).then(() => {
      cy.get('[data-test="new-game-btn"]').click();

      cy.reload();

      cy.get('[data-test="game-new"]').should('be.visible');
    });
  });

  it('refreshing page on history shows history state', () => {
    cy.get('[data-test="history-btn"]').click();

    cy.get('[data-test="history-overlay"]').should('exist');

    cy.reload();

    cy.get('[data-test="history-overlay"]').should('exist');
  });

  it('should show stats overlay on page refresh', () => {
    cy.get('[data-test="stats-btn"]').click();

    cy.get('[data-test="stats-overlay"]').should('exist');

    cy.reload();

    cy.get('[data-test="stats-overlay"]').should('exist');
  });

  it('should show correct games, time, and moves on page refresh', () => {
    cy.setBoard(foundations).then(() => {
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(2000);

      cy.get('[data-test="card-Q♠"]').clickTo('[data-test="foundation-3"]');

      cy.get('[data-test="stats"]')
        .as('stats')
        .text()
        .then(($value) => {
          cy.wrap($value).as('cachedStats');
        });

      cy.get('[data-test="timer"]')
        .as('timer')
        .text()
        .then(($value) => {
          cy.wrap($value).as('cachedTimer');
        });

      cy.get('[data-test="moves"]')
        .as('moves')
        .text()
        .then(($value) => {
          cy.wrap($value).as('cachedMoves');
        });

      cy.reload();

      cy.get('@cachedStats').then(($stats) => {
        cy.get('@stats')
          .text()
          .should('equal', $stats);
      });

      cy.get('@cachedTimer').then(($timer) => {
        cy.get('@timer')
          .text()
          .should('equal', $timer);
      });

      cy.get('@cachedMoves').then(($moves) => {
        cy.get('@moves')
          .text()
          .should('equal', $moves);
      });
    });
  });
});
