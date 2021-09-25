Cypress.Commands.add('checkFilterAtTopOfPage', () => {
  cy.get('[data-test="filters"]').then(($filters) => {
    const { scrollTop } = $filters[0];

    expect(scrollTop).to.equal(0);
  });
});
