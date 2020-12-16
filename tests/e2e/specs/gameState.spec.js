import foundations from '../../fixtures/boards/fullFoundation.json';
import noMovesKingColumn from '../../fixtures/boards/noMovesKingColumn.json';

describe('Game State', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
  });

  it('refreshing page shows same board state', () => {
    cy.setBoard(foundations).then(() => {
      cy.get('[data-test="card-Q♠"]')
        .click()
        .should('have.class', 'card--is-selected');

      cy.reload();

      cy.get('[data-test="column-0"]')
        .children()
        .should('have.length', 2);

      cy.get('[data-test="columns"]').within(() => {
        cy.get('[data-test="column-card-placeholder"]').should(
          'have.length',
          7
        );
      });
    });
  });

  it('clicking on new game sets new board state', () => {
    cy.setBoard(foundations).then(() => {
      cy.get('[data-test="new-game-btn"]').click();
      cy.get('[data-test="new-game-overlay-new-btn"]').click();

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
    cy.setBoard(foundations).then(() => {
      cy.get('[data-test="card-Q♠"]')
        .click()
        .should('have.class', 'card--is-selected');

      cy.reload();

      cy.get('[data-test="column-1"]').click();

      cy.get('[data-test="card-Q♠"]').should(
        'not.have.class',
        'card--is-selected'
      );
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
});
