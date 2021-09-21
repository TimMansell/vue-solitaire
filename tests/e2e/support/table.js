Cypress.Commands.add('checkCorrectTableRows', (rows) => {
  cy.get('[data-test="table-row"]').should('have.length', rows);
});

Cypress.Commands.add('checkTableRow', ({ row, cell, value }) => {
  cy.get('[data-test="table-row"]')
    .eq(row)
    .find('td')
    .eq(cell)
    .should('contain', value);
});

Cypress.Commands.add('checkTableHeading', ({ cell, heading }) => {
  cy.get('[data-test="table-header-row"]')
    .find('th')
    .eq(cell)
    .should('contain', heading);
});
