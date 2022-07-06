Cypress.Commands.add('setPage', (pageText) => {
  cy.get('[data-test="pagination"]').contains(pageText).click();
});

Cypress.Commands.add('getActivePage', () => {
  cy.get('[data-test="pagination"]')
    .find('.pagination__page--is-active')
    .formatNumber();
});
