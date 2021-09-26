Cypress.Commands.add('checkTableHasRowLength', (rows) => {
  cy.get('[data-test="table-row"]').should('have.length', rows);
});

Cypress.Commands.add('checkTableCell', ({ row, cell, value }) => {
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

Cypress.Commands.add('getTableCellValue', ({ row, cell }) => {
  cy.get('[data-test="table-row"]').eq(row).find('td').eq(cell);
});
