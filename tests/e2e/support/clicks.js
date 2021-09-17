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
      cy.get(`[data-test="card-${value}${suit}"]`).clickTo(
        `[data-test="column-${selectedColumn}"]`
      );
    }

    if (isFoundation) {
      cy.get(`[data-test="card-${value}${suit}"]`).clickTo(
        `[data-test="foundation-${selectedColumn}"]`
      );
    }
  });
});
