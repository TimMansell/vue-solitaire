import emptyColumn from '../../fixtures/boards/emptyColumn.json';
import foundations from '../../fixtures/boards/fullFoundation.json';

describe('Controls', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('it should start a new game and reset board', () => {
    cy.setBoard(emptyColumn).then(() => {
      cy.get('[data-test="column-3"]').within(() => {
        cy.get('[data-test="card-A♥"]').should('be.visible');
      });

      cy.get('[data-test="card-A♥"]').clickTo('[data-test="foundation-0"]');

      cy.get('[data-test="card-5♠"]').click();

      cy.get('[data-test="new-game-btn"]').click();

      cy.get('[data-test="game-overlay-btns"]').within(() => {
        cy.get('[data-test="new-game-btn"]').click();
      });

      cy.get('[data-test="foundation-0"]').shouldNotContain(['A♥']);

      cy.get('[data-test="card-5♠"]').should(
        'not.have.class',
        'card--is-selected'
      );
    });
  });

  it('it should continue current game', () => {
    cy.setBoard(emptyColumn).then(() => {
      cy.get('[data-test="column-3"]').within(() => {
        cy.get('[data-test="card-A♥"]').should('be.visible');
      });

      cy.get('[data-test="card-A♥"]').clickTo('[data-test="foundation-0"]');

      cy.get('[data-test="card-5♠"]').click();

      cy.get('[data-test="new-game-btn"]').click();

      cy.get('[data-test="game-overlay-btns"]').within(() => {
        cy.get('[data-test="continue-game-btn"]').click();
      });

      cy.get('[data-test="foundation-0"]').shouldContain(['A♥']);

      cy.get('[data-test="card-5♠"]').should('have.class', 'card--is-selected');
    });
  });

  it('it should open and close rules', () => {
    cy.get('[data-test="game-rules-btn"]').click();

    cy.get('[data-test="rules-overlay"]').should('be.visible');

    cy.get('[data-test="close-rules-btn"]').scrollIntoView();

    cy.get('[data-test="close-rules-btn"]').click();

    cy.get('[data-test="rules-overlay"]').should('not.be.visible');
  });

  it('should move last cards foundation and then show win screen', () => {
    cy.setBoard(foundations).then(() => {
      cy.get('[data-test="game-won"]').should('not.be.visible');

      cy.get('[data-test="column-0"]').shouldContain(['K♠', 'Q♠']);

      cy.get('[data-test="card-Q♠"]').clickTo('[data-test="foundation-3"]');
      cy.get('[data-test="card-K♠"]').clickTo('[data-test="foundation-3"]');

      cy.get('[data-test="game-won"]').should('be.visible');

      cy.get('[data-test="game-overlay-btns"]').click();

      cy.get('[data-test="game-won"]').should('not.be.visible');

      cy.get('[data-test="foundation-3"]').shouldNotContain(['K♠', 'Q♠']);
    });
  });

  it('it should pause a game and show game paused overlay', () => {
    cy.setBoard(emptyColumn).then(() => {
      cy.get('[data-test="pause-game-btn"]').click();

      cy.get('[data-test="game-paused"]').should('be.visible');

      cy.get('[data-test="game-overlay-btns"]').within(() => {
        cy.get('[data-test="pause-game-btn"]').click();
      });

      cy.get('[data-test="game-paused"]').should('not.be.visible');
    });
  });
});
