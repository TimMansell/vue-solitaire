Cypress.Commands.add('clickTo', { prevSubject: true }, (subject, clickTo) => {
  cy.get(subject).click({ force: true });
  cy.get(clickTo).click({ force: true });
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
