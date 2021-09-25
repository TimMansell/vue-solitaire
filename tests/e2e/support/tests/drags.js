Cypress.Commands.add('dragCardToPosition', (card, { x, y }) => {
  cy.get(`[data-test="card-${card}"]`)
    .trigger('dragstart', 0, 0, {
      dataTransfer: new DataTransfer(),
      force: true,
    })
    .trigger('mousemove', x, y, {
      force: true,
    })
    .then((draggedCard) => {
      const { offsetLeft, offsetTop } = draggedCard[0];

      cy.checkDraggedCardsPosition({ offsetLeft, offsetTop, x, y });
    });
});

Cypress.Commands.add('dragCardFromTo', (dragFrom, dragTo) => {
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

Cypress.Commands.add(
  'checkDraggedCardsPosition',
  ({ offsetLeft, offsetTop, x, y }) =>
    cy.get('[data-test="dragged-cards"]').then((cards) => {
      const { clientWidth } = cards[0];
      const left = offsetLeft + x - clientWidth / 2;
      const top = offsetTop + y;

      cy.get('[data-test="dragged-cards-container"]')
        .should('have.css', 'top', `${top}px`)
        .should('have.css', 'left', `${left}px`);
    })
);

Cypress.Commands.add('checkDraggedCardsLength', (length) =>
  cy
    .get('[data-test="dragged-cards"]')
    .children()
    .should('have.length', length)
);
