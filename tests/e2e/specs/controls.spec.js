import emptyColumn from '../../fixtures/boards/emptyColumn.json';
import foundations from '../../fixtures/boards/fullFoundation.json';

describe('Controls', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('it should start a new game and reset board', () => {
    cy.setBoard(emptyColumn).then(() => {
      cy.get('[data-test="column-3"]').within(() => {
        cy.get('[data-test="card-Ah"]').should('be.visible');
      });

      cy.get('[data-test="card-Ah"]').clickTo('[data-test="foundation-0"]');

      cy.get('[data-test="card-5s"]').click();

      cy.get('[data-test="new-game-btn"]').click();

      cy.get('[data-test="foundation-0"]').shouldNotContain(['Ah']);

      cy.get('[data-test="card-5s"]').should('not.have.class', 'card--is-selected');
    });
  });

  it('it should open and close rules', () => {
    cy.get('[data-test="game-rules"]').click();

    cy.get('[data-test="modal-content"]').should('be.visible');

    cy.get('[data-test="close-modal"]').click();

    cy.get('[data-test="modal-content"]').should('not.be.visible');
  });

  it('should move last cards foundation and then show win screen', () => {
    cy.setBoard(foundations).then(() => {
      cy.get('[data-test="game-won"]').should('not.be.visible');

      cy.get('[data-test="column-0"]').shouldContain(['Ks', 'Qs']);

      cy.get('[data-test="card-Qs"]').clickTo('[data-test="foundation-3"]');
      cy.get('[data-test="card-Ks"]').clickTo('[data-test="foundation-3"]');

      cy.get('[data-test="game-won"]').should('be.visible');

      cy.get('[data-test="game-overlay-btn"]').click();

      cy.get('[data-test="game-won"]').should('not.be.visible');

      cy.get('[data-test="foundation-3"]').shouldNotContain(['Ks', 'Qs']);
    });
  });

  it('it should start a new game and reset timer', () => {
    cy.setBoard(emptyColumn).then(() => {
      cy.wait(1500);

      cy.get('[data-test="timer"]').then(($timer) => {
        const number = $timer.text();

        cy.get('[data-test="new-game-btn"]').click();

        cy.get('[data-test="timer"]').should('not.equal', number);
      });
    });
  });
});
