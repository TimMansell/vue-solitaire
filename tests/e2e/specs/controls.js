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

      cy.get('[data-test="card-Ah"]').click();
      cy.get('[data-test="foundation-0"]').click();

      cy.get('[data-test="new-game"]').click();

      cy.get('[data-test="foundation-0"]').within(() => {
        cy.get('[data-test="card-Ah"]').should('not.be.visible');
      });
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
      cy.get('[data-test="winner"]').should('not.be.visible');

      cy.get('[data-test="column-0"]').shouldBeVisible(['Ks', 'Qs']);

      cy.get('[data-test="card-Qs"]').clickTo('[data-test="foundation-3"]');
      cy.get('[data-test="card-Ks"]').clickTo('[data-test="foundation-3"]');

      cy.get('[data-test="winner"]').should('be.visible');

      cy.get('[data-test="winner-btn"]').click();

      cy.get('[data-test="winner"]').should('not.be.visible');

      cy.get('[data-test="foundation-3"]').shouldNotBeVisible(['Ks', 'Qs']);
    });
  });
});
