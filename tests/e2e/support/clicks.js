Cypress.Commands.add('clickFromTo', (clickFrom, clickTo) => {
  const formattedClickTo =
    !clickTo.startsWith('foundation') && !clickTo.startsWith('column')
      ? `card-${clickTo}`
      : clickTo;

  cy.get(`[data-test="card-${clickFrom}"]`).click({ force: true });
  cy.get(`[data-test="${formattedClickTo}"]`).click({ force: true });
});

Cypress.Commands.add('runGameWithClicks', (moves) => {
  moves.forEach(({ value, suit, selectedColumn, isBoard, isFoundation }) => {
    if (isBoard) {
      cy.clickFromTo(`${value}${suit}`, `column-${selectedColumn}`);
    }

    if (isFoundation) {
      cy.clickFromTo(`${value}${suit}`, `foundation-${selectedColumn}`);
    }
  });
});
