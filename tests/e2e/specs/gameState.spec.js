import fullGameDeck from '../../fixtures/decks/fullGame.json';
import fullGameMoves from '../../fixtures/moves/fullGame.json';
import incompleteGameDeck from '../../fixtures/decks/incompleteGame.json';
import incompleteGameMoves from '../../fixtures/moves/incompleteGame.json';
import quitGameDeck from '../../fixtures/decks/quitGame.json';
import quitGameMoves from '../../fixtures/moves/quitGame.json';
import emptyColumnDeck from '../../fixtures/decks/emptyColumn.json';
import emptyColumnMoves from '../../fixtures/moves/emptyColumn.json';

describe('Game State', () => {
  afterEach(() => {
    cy.clearTest();
  });

  it('refreshing page shows same board state', () => {
    let initalCard1;
    let initialCard2;
    let initialCard3;

    cy.visitApp({ mockDeck: fullGameDeck });

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

    cy.reload();

    cy.get('[data-test="column-0"]').within(() => {
      cy.get('[data-test^="card"]')
        .eq(6)
        .then(($card) => {
          const finalCard1 = $card.attr('data-test');

          expect(initalCard1).to.equal(finalCard1);
        });
    });

    cy.get('[data-test="column-2"]').within(() => {
      cy.get('[data-test^="card"]')
        .eq(4)
        .then(($card) => {
          const finalCard2 = $card.attr('data-test');

          expect(initialCard2).to.equal(finalCard2);
        });
    });

    cy.get('[data-test="column-5"]').within(() => {
      cy.get('[data-test^="card"]')
        .eq(1)
        .then(($card) => {
          const finalCard3 = $card.attr('data-test');

          expect(initialCard3).to.equal(finalCard3);
        });
    });
  });

  it('clicking on new game sets new board state', () => {
    cy.visitApp({ mockDeck: emptyColumnDeck });

    cy.runGameWithClicks(emptyColumnMoves);

    cy.newGame();

    cy.get('[data-test="columns"]').within(() => {
      cy.get('[data-test="column-card-placeholder"]').should('not.exist');
    });
  });

  it('clicking on card then refreshing page should highlight card, then unhighlight card', () => {
    cy.visitApp({ mockDeck: fullGameDeck });

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
    cy.visitApp({ mockDeck: fullGameDeck });

    cy.runGameWithClicks(fullGameMoves);

    cy.get('[data-test="game-won"]').should('be.visible');

    cy.reload();

    cy.get('[data-test="game-won"]').should('be.visible');
  });

  it('refreshing page on game lost shows game lost state', () => {
    cy.visitApp({ mockDeck: incompleteGameDeck });

    cy.runGameWithClicks(incompleteGameMoves);

    cy.get('[data-test="game-lost"]').should('be.visible');

    cy.reload();

    cy.get('[data-test="game-lost"]').should('be.visible');
  });

  it('refreshing page on leaderboards shows leaderboards', () => {
    cy.visitApp({ mockDeck: fullGameDeck });

    cy.get('[data-test="leaderboards-btn"]').click();

    cy.get('[data-test="leaderboards-overlay"]').should('be.visible');

    cy.reload();

    cy.get('[data-test="leaderboards-overlay"]').should('be.visible');

    cy.wait('@waitForLeaderboardAPI');
  });

  it('refreshing page on how to play shows how to play', () => {
    cy.visitApp({ mockDeck: fullGameDeck });

    cy.get('[data-test="game-rules-btn"]').click();

    cy.get('[data-test="rules-overlay"]').should('be.visible');

    cy.reload();

    cy.get('[data-test="rules-overlay"]').should('be.visible');
  });

  it('should pause when page is automatically hidden', () => {
    cy.visitApp({ mockDeck: fullGameDeck });

    cy.document().then((doc) => {
      cy.stub(doc, 'visibilityState').value('hidden');
    });

    cy.document().trigger('visibilitychange');

    cy.get('[data-test="game-paused"]').should('be.visible');
  });

  it('refreshing page on game paused shows game paused state', () => {
    cy.visitApp({ mockDeck: fullGameDeck });

    cy.get('[data-test="pause-game-btn"]').click();

    cy.get('[data-test="game-paused"]').should('be.visible');

    cy.reload();

    cy.get('[data-test="game-paused"]').should('be.visible');
  });

  it('refreshing page on new game shows new game state', () => {
    cy.visitApp({ mockDeck: fullGameDeck });

    cy.get('[data-test="new-game-btn"]').click();

    cy.reload();

    cy.get('[data-test="game-new"]').should('be.visible');
  });

  it('refreshing page on history shows history state', () => {
    cy.visitApp({ mockDeck: fullGameDeck });

    cy.get('[data-test="history-btn"]').click();

    cy.get('[data-test="history-overlay"]').should('exist');

    cy.reload();

    cy.get('[data-test="history-overlay"]').should('exist');
  });

  it('should show stats overlay on page refresh', () => {
    cy.visitApp({ mockDeck: fullGameDeck });

    cy.get('[data-test="stats-btn"]').click();

    cy.get('[data-test="stats-overlay"]').should('exist');

    cy.reload();

    cy.get('[data-test="stats-overlay"]').should('exist');
  });

  it('should show correct games, time, and moves on page refresh', () => {
    cy.visitApp({ mockDeck: quitGameDeck });

    cy.runGameWithClicks(quitGameMoves);

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
