describe('App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('it successfullly loads', () => {
    cy.get('[data-test="board"]').should('be.visible');
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
