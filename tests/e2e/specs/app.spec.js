describe('App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('it successfullly loads', () => {
    cy.get('[data-test="board"]').should('be.visible');
  });
});
