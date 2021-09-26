Cypress.Commands.add('clickCard', (card) =>
  cy.get(`[data-test="card-${card}"]`).click({ force: true })
);

Cypress.Commands.add('clickFromTo', (clickFrom, clickTo) => {
  cy.clickCard(clickFrom);

  if (!clickTo.startsWith('foundation') && !clickTo.startsWith('column')) {
    cy.clickCard(clickTo);
  } else {
    cy.get(`[data-test="${clickTo}"]`).click({ force: true });
  }
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
