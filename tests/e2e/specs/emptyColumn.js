import emptyColumn from '../../fixtures/boards/emptyColumn.json';
import invalidMove from '../../fixtures/decks/invalidMove.json';

describe('Special column moves', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should move Kc & 9c to an empty column', () => {
    cy.setBoard(emptyColumn).then(() => {
      cy.get('[data-test="column-7"]').within(() => {
        cy.get('[data-test="card-Kc"]').should('be.visible');
      });

      cy.get('[data-test="card-Kc"]').click({ force: true });
      cy.get('[data-test="column-0"]').click();

      cy.get('[data-test="column-0"]').within(() => {
        cy.get('[data-test="card-Kc"]').should('be.visible');
      });

      cy.get('[data-test="column-7"]').within(() => {
        cy.get('[data-test="card-Kc"]').should('not.be.visible');
        cy.get('[data-test="card-9c"]').should('not.be.visible');
      });
    });
  });

  it('should move Kc to 5s to an empty column', () => {
    cy.setBoard(emptyColumn).then(() => {
      cy.get('[data-test="column-1"]').within(() => {
        cy.get('[data-test="card-Kh"]').should('be.visible');
      });

      cy.get('[data-test="card-Kh"]').click({ force: true });
      cy.get('[data-test="column-0"]').click();

      cy.get('[data-test="column-0"]').within(() => {
        cy.get('[data-test="card-Kh"]').should('be.visible');
        cy.get('[data-test="card-9d"]').should('be.visible');
        cy.get('[data-test="card-5s"]').should('be.visible');
      });

      cy.get('[data-test="column-1"]').within(() => {
        cy.get('[data-test="card-Kh"]').should('not.be.visible');
        cy.get('[data-test="card-9d"]').should('not.be.visible');
        cy.get('[data-test="card-5s"]').should('not.be.visible');

        cy.get('[data-test="card-As"]').should('be.visible');
      });
    });
  });

  // K to not empty
  it('should not move Ks to 9d', () => {
    cy.setDeck(invalidMove).then(() => {
      cy.get('[data-test="column-7"]').within(() => {
        cy.get('[data-test="card-Ks"]').should('be.visible');
      });

      cy.get('[data-test="card-Ks"]').click();
      cy.get('[data-test="card-9d"]').click();

      cy.get('[data-test="column-1"]').within(() => {
        cy.get('[data-test="card-Ks"]').should('not.be.visible');
      });
    });
  });

  it('should not move 7s to empty column', () => {
    cy.setBoard(emptyColumn).then(() => {
      cy.get('[data-test="column-3"]').within(() => {
        cy.get('[data-test="card-7s"]').should('be.visible');
      });

      cy.get('[data-test="card-7s"]').click();
      cy.get('[data-test="column-0"]').click();

      cy.get('[data-test="column-0"]').within(() => {
        cy.get('[data-test="card-7s"]').should('not.be.visible');
      });

      cy.get('[data-test="column-3"]').within(() => {
        cy.get('[data-test="card-7s"]').should('be.visible');
      });
    });
  });

  it('should not move Jd to empty column', () => {
    cy.setBoard(emptyColumn).then(() => {
      cy.get('[data-test="column-3"]').within(() => {
        cy.get('[data-test="card-Jd"]').should('be.visible');
      });

      cy.get('[data-test="card-Jd"]').click({ force: true });
      cy.get('[data-test="column-0"]').click();

      cy.get('[data-test="column-0"]').within(() => {
        cy.get('[data-test="card-Jd"]').should('not.be.visible');
      });

      cy.get('[data-test="column-3"]').within(() => {
        cy.get('[data-test="card-Jd"]').should('be.visible');
      });
    });
  });
});
