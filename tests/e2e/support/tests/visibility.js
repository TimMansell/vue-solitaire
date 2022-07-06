Cypress.Commands.add('checkBodyOverflow', (isHidden) => {
  const haveCss = isHidden ? 'hidden' : 'auto';

  cy.get('[data-test="body"]').should('have.css', 'overflow', haveCss);
});
