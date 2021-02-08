describe('App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('it successfullly loads', () => {
    cy.get('[data-test="board"]').should('be.visible');

    cy.get('[data-test="columns"]').within(() => {
      cy.get('[data-test^="card-"]').should('have.length', 52);
    });

    cy.get('[data-test="foundations"]').within(() => {
      cy.get('[data-test^="foundation-"]').should('have.length', 4);
    });
  });

  it('it should hide scroll bar when overlay is open and show scrollbar when overlay is closed', () => {
    cy.get('[data-test="pause-game-btn"]').click();

    cy.get('[data-test="body"]').should('have.css', 'overflow', 'hidden');

    cy.get('[data-test="game-overlay-btns"]').within(() => {
      cy.get('[data-test="pause-game-btn"]').click();
    });

    cy.get('[data-test="body"]').should('have.css', 'overflow', 'auto');
  });
});
