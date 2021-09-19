Cypress.Commands.add('setPage', (pageText) => {
  cy.get('[data-test="pagination"]')
    .contains(pageText)
    .click();
});

Cypress.Commands.add('checkCorrectPage', (activePage) => {
  cy.get('[data-test="pagination"]')
    .find('.pagination__page--is-active')
    .should('contain', activePage);
});

Cypress.Commands.add('checkLastPage', () => {
  cy.get('[data-test="pagination"]')
    .children()
    .eq(-3)
    .should('have.class', 'pagination__page--is-active');
});
