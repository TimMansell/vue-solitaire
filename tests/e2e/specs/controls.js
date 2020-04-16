import emptyColumn from '../../fixtures/boards/emptyColumn.json';

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

      cy.get('[data-test="foundation-0"]').within(() => {
        cy.get('[data-test="Ah"]').should('not.be.visible');
      });
    });
  });
});
