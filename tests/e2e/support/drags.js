Cypress.Commands.add('dragFromTo', (dragFrom, dragTo) => {
  const formattedDragFrom = `card-${dragFrom}`;
  const formattedDragTo =
    !dragTo.startsWith('foundation') &&
    !dragTo.startsWith('column') &&
    !dragTo.startsWith('board')
      ? `card-${dragTo}`
      : dragTo;

  cy.get(`[data-test="${formattedDragFrom}"]`)
    .trigger('dragstart', {
      dataTransfer: new DataTransfer(),
      eventConstructor: 'DragEvent',
      force: true,
    })
    .trigger('mousemove', 0, 0, {
      force: true,
    });

  cy.get(
    `[data-test="dragged-cards"] [data-test="${formattedDragFrom}"]`
  ).should('be.visible');

  cy.get(`[data-test="columns"] [data-test="${formattedDragFrom}"]`).should(
    'not.be.visible'
  );

  cy.get(`[data-test="${formattedDragTo}"]`)
    .trigger('drop', { force: true })
    .trigger('dragend', { force: true });

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
