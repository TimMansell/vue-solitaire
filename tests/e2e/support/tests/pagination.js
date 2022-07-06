Cypress.Commands.add('checkIsOnPage', (activePage) => {
  cy.get('[data-test="pagination"]')
    .find('.pagination__page--is-active')
    .should('contain', activePage);
});

Cypress.Commands.add('checkIsOnLastPage', () => {
  cy.get('[data-test="pagination"]')
    .children()
    .eq(-3)
    .should('have.class', 'pagination__page--is-active');
});
