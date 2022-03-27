Cypress.Commands.add('setVisibilityHidden', () => {
  cy.document().then((doc) => {
    cy.stub(doc, 'visibilityState').value('hidden');
  });
});

Cypress.Commands.add('triggerVisibilityChange', () => {
  cy.document().trigger('visibilitychange');
});
