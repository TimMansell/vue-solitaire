import invalidMove from '../../fixtures/decks/invalidMove.json';

describe('Invalid moves', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  // invalid value, invalid suit
  it('should not move 6s to 4d and 5s to 10d', () => {
    cy.setDeck(invalidMove).then(() => {
      // Test card from middle.
      cy.get('[data-test="column-4"]').within(() => {
        cy.get('[data-test="card-6s"]').should('be.visible');
      });

      cy.get('[data-test="card-6s"]').click();
      cy.get('[data-test="card-4d"]').click();

      cy.get('[data-test="column-5"]').within(() => {
        cy.get('[data-test="card-6s"]').should('not.be.visible');
      });

      // Test card from bottom.
      cy.get('[data-test="column-0"]').within(() => {
        cy.get('[data-test="card-5s"]').should('be.visible');
      });

      cy.get('[data-test="card-5s"]').click();
      cy.get('[data-test="card-10d"]').click();

      cy.get('[data-test="column-6"]').within(() => {
        cy.get('[data-test="card-5s"]').should('not.be.visible');
      });
    });
  });

  // valid value, wrong suit
  it('should not move 4d to 5s', () => {
    cy.setDeck(invalidMove).then(() => {
      cy.get('[data-test="column-5"]').within(() => {
        cy.get('[data-test="card-4d"]').should('be.visible');
      });

      cy.get('[data-test="card-4d"]').click();
      cy.get('[data-test="card-5s"]').click();

      cy.get('[data-test="column-0"]').within(() => {
        cy.get('[data-test="card-4d"]').should('not.be.visible');
      });
    });
  });

  // valid suit, wrong value
  it('should not move 7d to 9d', () => {
    cy.setDeck(invalidMove).then(() => {
      cy.get('[data-test="column-2"]').within(() => {
        cy.get('[data-test="card-7d"]').should('be.visible');
      });

      cy.get('[data-test="card-7d"]').click();
      cy.get('[data-test="card-9d"]').click();

      cy.get('[data-test="column-1"]').within(() => {
        cy.get('[data-test="card-7d"]').should('not.be.visible');
      });
    });
  });

  // valid card, same column
  it('should not move Qs to Ks on the same column', () => {
    cy.setDeck(invalidMove).then(() => {
      cy.get('[data-test="column-7"]').within(() => {
        cy.get('[data-test="card-Qs"]').should('be.visible');
      });

      cy.get('[data-test="card-Qs"]').click({ force: true });
      cy.get('[data-test="card-Ks"]').click();

      cy.get('[data-test="column-7"]').within(() => {
        cy.get('[data-test*="card-"]').eq(1).should('contain', 'Qs');
      });
    });
  });
});
