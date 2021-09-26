Cypress.Commands.add('setVisibilityHidden', () => {
  cy.document().then((doc) => {
    cy.stub(doc, 'visibilityState').value('hidden');
  });
});

Cypress.Commands.add('triggerVisibilityChange', () => {
  cy.document().trigger('visibilitychange');
});

Cypress.Commands.add('checkVisibilityHidden', (isHidden) => {
  const haveCss = isHidden ? 'hidden' : 'auto';

  cy.get('[data-test="body"]').should('have.css', 'overflow', haveCss);
});
