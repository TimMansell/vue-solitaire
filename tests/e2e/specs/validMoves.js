import validMove from '../../fixtures/decks/validMove.json';

describe('Valid moves', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('using drag and drop', () => {
    it('should move 6d to 7d and 9d to 10d', () => {
      cy.setDeck(validMove).then(() => {
        // Test card from middle.
        cy.get('[data-test="column-3"]').shouldBeVisible(['6d']);

        cy.get('[data-test="card-6d"]').dragTo('[data-test="card-7d"]');

        cy.get('[data-test="column-2"]').shouldBeVisible(['6d']);

        // Test card from bottom.
        cy.get('[data-test="column-1"]').shouldBeVisible(['9d']);

        cy.get('[data-test="card-9d"]').dragTo('[data-test="card-10d"]');

        cy.get('[data-test="column-6"]').shouldBeVisible(['9d']);
      });
    });
  });

  describe('using clicks', () => {
    it('should move 6d to 7d and 9d to 10d', () => {
      cy.setDeck(validMove).then(() => {
        // Test card from middle.
        cy.get('[data-test="column-3"]').shouldBeVisible(['6d']);

        cy.get('[data-test="card-6d"]').clickTo('[data-test="card-7d"]');

        cy.get('[data-test="column-2"]').shouldBeVisible(['6d']);

        // Test card from bottom.
        cy.get('[data-test="column-1"]').shouldBeVisible(['9d']);

        cy.get('[data-test="card-9d"]').clickTo('[data-test="card-10d"]');

        cy.get('[data-test="column-6"]').shouldBeVisible(['9d']);
      });
    });
  });
});
