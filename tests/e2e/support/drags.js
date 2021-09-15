Cypress.Commands.add('dragFromTo', (dragFrom, dragTo) => {
  cy.get(`[data-test="${dragFrom}"]`)
    .trigger('dragstart', {
      dataTransfer: new DataTransfer(),
      eventConstructor: 'DragEvent',
      force: true,
    })
    .trigger('mousemove', 0, 0, {
      force: true,
    });

  cy.get(`[data-test="dragged-cards"] [data-test="${dragFrom}"]`).should(
    'be.visible'
  );

  cy.get(`[data-test="columns"] [data-test="${dragFrom}"]`).should(
    'not.be.visible'
  );

  cy.get(`[data-test="${dragTo}"]`)
    .trigger('drop', { force: true })
    .trigger('dragend', { force: true });

  // eslint-disable-next-line cypress/no-unnecessary-waiting
  // cy.wait(500);

  cy.get('[data-test="dragged-cards"]')
    .children()
    .should('have.length', 0);
});

Cypress.Commands.add('drag', { prevSubject: true }, (subject, x, y) => {
  cy.get('[data-test="columns"]').within(() => {
    cy.get(subject)
      .trigger('dragstart', 0, 0, {
        dataTransfer: new DataTransfer(),
        force: true,
      })
      .trigger('mousemove', x, y, {
        force: true,
      });
  });
});
